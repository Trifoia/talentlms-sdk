'use strict';

const assert = require('assert').strict;

const config = require('../config.js');
const TalentLMSSdk = require('../index.js');

describe('integration', function() {
  this.timeout(100000);

  const sdk = new TalentLMSSdk({
    apiKey: config.talent.apiKey,
    domain: config.talent.domain,
    verbose: true
  });

  it('should run "user" operations', async () => {
    // TODO: Generate integration tests for "user" operations
  });

  it.skip('should run "unit" operations', async () => {
    // TODO: Generate integration tests for "unit" operations
  });

  it.skip('should run "siteInfo" operations', async () => {
    // Get domain info
    let res = await sdk.siteInfo.get();
    assert.ok(res.total_users);
    assert.ok(res.total_courses);

    // Get rate limit info
    res = await sdk.siteInfo.getRateLimit();
    assert.ok(res.limit);
    assert.ok(res.remaining);
    assert.ok(res.reset);

    // Get timeline events
    res = await sdk.siteInfo.getTimeline({event_type: 'user_login_user'});
    assert.ok(res.length);
    res.forEach((item) => {
      assert.equal(item.action, 'user_login_user');
    });

    // Get timeline events with additional params
    res = await sdk.siteInfo.getTimeline({event_type: 'user_login_user', user_id: 1});
    assert.ok(res.length);
    res.forEach((item) => {
      assert.equal(item.action, 'user_login_user');
      assert.equal(item.user_id, '1');
    });
  });

  it.skip('should run "group" operations', async () => {
    const name = '0 Test Group';
    const key = 'temp-test-key';

    // Create a group
    let res = await sdk.group.create({name, key, max_redemptions: 1});
    assert.equal(res.name, name);
    assert.equal(res.key, key);
    assert.equal(res.max_redemptions, '1');

    const id = res.id.toString();

    // Get all groups (should include newly created group)
    res = await sdk.group.all();
    res = res.find(group => group.id === id);
    assert.equal(res.name, name);

    // Add a user to the group
    res = await sdk.group.addUser({user_id: 1, group_key: key});
    assert.equal(res.user_id, '1');
    assert.equal(res.group_id, id);
    assert.equal(res.group_name, name);

    // Add a course to the group
    res = await sdk.group.addCourse({course_id: 126, group_id: id});
    assert.equal(res.course_id, '126');
    assert.equal(res.group_id, id);
    assert.equal(res.group_name, name);

    // Get specific group and verify user and course add
    res = await sdk.group.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 1);
    assert.equal(res.users[0].id, '1');
    assert.equal(res.courses.length, 1);
    assert.equal(res.courses[0].id, '126');

    // Remove user from group
    res = await sdk.group.removeUser({user_id: 1, group_id: id});
    assert.equal(res.user_id, '1');
    assert.equal(res.group_id, id);
    assert.equal(res.group_name, name);

    // Verify user removal
    res = await sdk.group.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 0);

    // Delete the group
    res = await sdk.group.delete({group_id: id});
    assert.equal(res.message, 'Operation completed successfully');

    // Verify group deletion
    res = await sdk.group.all();
    res = res.find(group => group.id === id);
    assert.ok(!res);
  });

  it.skip('should run "course" operations', async () => {
    //! Brittle: Relies on the existence of a custom course field with name "Test"
    const name = '0 Test Course';
    const customFieldVal = 'Custom field test ' + Math.random();

    // Get custom course fields
    let res = await sdk.course.getCustomCourseFields();
    const customFieldKey = res.find(val => val.name === 'Test').key;

    // Create a course
    const createOpts = {
      name,
      creator_id: 3
    };
    createOpts[customFieldKey] = customFieldVal;
    res = await sdk.course.create(createOpts);
    console.log(res);
    assert.ok(res.id);
    assert.equal(res.name, name);

    const id = res.id.toString();

    // Get all courses (should include newly created course)
    res = await sdk.course.all();
    res = res.find((val) => val.id === id);
    assert.equal(res.name, name);

    // Add a user to a course
    res = await sdk.course.addUser({user_id: 1, course_id: id, role: 'learner'});
    assert.equal(res[0].user_id, '1');
    assert.equal(res[0].course_id, id);
    assert.equal(res[0].role, 'learner');

    // Get specific course and verify user exists
    res = await sdk.course.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 2);
    assert.ok(res.users.find(user => user.id === '1'));
    assert.ok(res.users.find(user => user.id === '3'));

    // Get go to course link
    res = await sdk.course.goToCourse({user_id: 1, course_id: id});
    assert.ok(res.goto_url.includes(`course_id:${id}`));

    // Get user course status
    res = await sdk.course.getUserStatus({user_id: 1, course_id: id});
    assert.equal(res.completion_percentage, '0');
    assert.equal(res.role, 'learner');

    // Reset user course status
    res = await sdk.course.resetUserProgress({user_id: 1, course_id: id});
    assert.equal(res.message, 'Operation completed successfully');

    // Remove user
    res = await sdk.course.removeUser({user_id: 1, course_id: id});
    assert.equal(res.user_id, '1');
    assert.equal(res.course_id, id);
    assert.equal(res.course_name, name);

    // Verify user removal
    res = await sdk.course.retrieve(id);
    assert.equal(res.name, name);
    res.users.forEach(user => assert.ok(user.id !== '1'));

    // Get course by custom field
    res = await sdk.course.getByCustomField({custom_field_value: customFieldVal});
    assert.equal(res.length, 1);
    assert.equal(res[0].id, id);

    // Get a buy course link
    res = await sdk.course.buyCourse({user_id: 1, course_id: id});
    assert.ok(res.redirect_url);

    // Delete the course
    res = await sdk.course.delete({course_id: id});
    assert.equal(res.message, 'Operation completed successfully');

    // Verify course deletion
    res = await sdk.course.all();
    res = res.find((val) => val.id === id);
    assert.ok(!res);
  });

  it.skip('should run "category" operations', async () => {
    //! Brittle: Relies on specific categories existing in the system
    const id = '8';

    // Get a specific category
    let res = await sdk.category.retrieve(id);
    assert.equal(res.id, id);
    assert.ok(res.name);

    const name = res.name;

    // Get all categories
    res = await sdk.category.all();
    res = res.find(val => val.id === id);
    assert.equal(res.name, name);

    // Get category leafs
    res = await sdk.category.retrieveLeafsAndCourses(id);
    assert.equal(Object.keys(res).length, 2);
    assert.equal(res[9].id, '9');
    assert.equal(res[12].id, '12');

    // Get buy category link
    res = await sdk.category.buyCategoryCourses({category_id: 8, user_id: 1});
    assert.ok(res.redirect_url);
  });

  it.skip('should run "branch" operations', async () => {
    const name = '0testbranch';

    // Create new branch
    let res = await sdk.branch.create({name});
    assert.ok(res.id);
    assert.equal(res.name, name);

    const id = res.id.toString();

    // Get all branches (should include the new branch)
    res = await sdk.branch.all();
    res = res.find((val) => val.id === id);
    assert.equal(res.name, name);

    // Add a user to the new branch
    res = await sdk.branch.addUser({user_id: 1, branch_id: id});
    assert.equal(res.user_id, '1');
    assert.equal(res.branch_id, id);
    assert.equal(res.branch_name, name);

    // Add a course to the new branch
    res = await sdk.branch.addCourse({course_id: 126, branch_id: id});
    assert.equal(res.course_id, '126');
    assert.equal(res.branch_id, id);
    assert.equal(res.branch_name, name);

    // Retrieve the newly created branch and verify new elements
    res = await sdk.branch.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 1);
    assert.equal(res.users[0].id, '1');
    assert.equal(res.courses.length, 1);
    assert.equal(res.courses[0].id, '126');
    
    // Remove the user from the branch
    res = await sdk.branch.removeUser({user_id: 1, branch_id: id});
    assert.equal(res.user_id, '1');
    assert.equal(res.branch_id, id);
    assert.equal(res.branch_name, name);

    // Verify user removal
    res = await sdk.branch.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 0);

    // Set branch status
    res = await sdk.branch.setStatus({branch_id: id, status: 'inactive'});
    assert.equal(res.branch_id, id);
    assert.equal(res.status, 'inactive');

    // Delete branch
    res = await sdk.branch.delete({branch_id: id});
    assert.equal(res.message, 'Operation completed successfully');

    // Confirm deletion
    res = await sdk.branch.all();
    res = res.find((val) => val.id === id);
    assert.ok(!res);
  });
});
