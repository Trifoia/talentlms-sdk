'use strict';

const phin = require('phin');

const assert = require('assert').strict;

const config = require('../config.js');
const TalentLMSSdk = require('../index.js');

/**
 * Configurations for the integration tests that may need to be altered depending on the
 * configuration of the existing TalentLMS account
 */
const testConf = {
  branch: {
    name: '0testbranch',
    userId: '3',
    courseId: '126'
  },
  category: {
    id: '5',
    leafIds: [
      '6',
      '7'
    ],
    userId: '3'
  },
  course: {
    name: '0 Test Course',
    customFieldVal: 'Custom field test ' + Math.random(),
    customFieldName: 'Test',
    creatorId: '5',
    userId: '3'
  },
  group: {
    name: '0 Test Group',
    key: 'temp-test-key',
    userId: '3',
    courseId: '126'
  },
  siteInfo: {
    userId: '3'
  },
  unit: {
    unitId: '2063',
    testId: '2063',
    surveyId: '2064',
    iltId: '2065',
    userId: '3'
  },
  user: {
    firstName: 'testFirst',
    lastName: 'testLast',
    email: 'test' + Math.random() + '@testEmail.com',
    password: 'testPassword',
    customFieldName: 'Test',
    customFieldVal: 'custom-field' + Math.random()
  }
};

describe('integration', function() {
  this.timeout(100000);

  const sdk = new TalentLMSSdk({
    apiKey: config.talent.apiKey,
    domain: config.talent.domain,
    verbose: true
  });

  it('should run "user" operations', async () => {
    const {user} = testConf;

    let res = await sdk.user.getCustomRegistrationFields();
    const customFieldKey = res.find(val => val.name === user.customFieldName).key;
    const signupOpts = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      login: user.email,
      password: user.password, // This being required makes me physically ill
      restrict_email: true
    };
    signupOpts[customFieldKey] = user.customFieldVal;

    // Create new user
    res = await sdk.user.signup(signupOpts);
    assert.equal(res.login, user.email);
    assert.equal(res.email, user.email);
    assert.equal(res.first_name, user.firstName);
    assert.equal(res.last_name, user.lastName);
    assert.equal(res[customFieldKey], user.customFieldVal);

    const id = res.id.toString();

    // Edit the new user
    res = await sdk.user.edit({
      user_id: id,
      first_name: 'differentTest'
      // password: 'newTestPass' // This is REALLY upsetting
    });
    assert.equal(res.id, id);
    assert.equal(res.first_name, 'differentTest');

    //* Only use the following with real emails, you don't want to get into trouble :)
    // // Try out the forgot username path
    // res = await sdk.user.forgotUsername({email: user.email});
    // assert.equal(res.user_id, id);

    // // Try out the forgot password path
    // res = await sdk.user.forgotPassword({username: user.email});
    // assert.equal(res.user_id, id);

    // Get the user by custom field
    res = await sdk.user.getByCustomField({custom_field_value: user.customFieldVal});
    assert.equal(res[id].id, id);
    assert.equal(res[id].email, user.email);

    // Retrieve the user
    res = await sdk.user.retrieve(id);
    assert.equal(res.id, id);

    // Retrieve the user via email
    res = await sdk.user.retrieve({email: user.email});
    assert.equal(res.id, id);

    // Retrieve the user via username
    res = await sdk.user.retrieve({username: user.email});
    assert.equal(res.id, id);

    // Get login link
    res = await sdk.user.login({login: user.email, password: user.password});
    assert.equal(res.user_id, id);
    assert.ok(res.login_key);

    // Actually log in
    await phin(res.login_key);

    // Logout
    res = await sdk.user.logout({user_id: id});
    assert.equal(res.redirect_url, `https://${config.talent.domain}/index/logout/next:`);

    // Change user status
    res = await sdk.user.setStatus({user_id: id, status: 'inactive'});
    assert.equal(res.user_id, id);
    assert.equal(res.status, 'inactive');

    // Find user among all users
    res = await sdk.user.all();
    res = res.find(item => item.id === id);
    assert.equal(res.status, 'inactive');

    // Delete the user
    res = await sdk.user.delete({user_id: id, permanent: true});
    assert.equal(res.message, 'Operation completed successfully');

    // Verify user deletion
    res = await sdk.user.all();
    res = res.find(item => item.id === id);
    assert.ok(!res);
  });

  it('should run "unit" operations', async () => {
    const {unit} = testConf;

    // Get unit info for all users
    let res = await sdk.unit.getUserProgress({unit_id: unit.unitId});
    res = res.find(item => item.user_id === unit.userId);
    assert.equal(res.user_id, unit.userId);

    // Get unit info for a specific info
    res = await sdk.unit.getUserProgress({unit_id: unit.unitId, user_id: unit.userId});
    assert.equal(res.user_id, unit.userId);

    // Get test answers
    res = await sdk.unit.getTestAnswers({test_id: unit.testId, user_id: unit.userId});
    assert.equal(res.test_id, unit.testId);
    assert.equal(res.user_id, unit.userId);
    assert.ok(res.questions.length);

    // Get survey answers
    res = await sdk.unit.getSurveyAnswers({survey_id: unit.surveyId, user_id: unit.userId});
    assert.equal(res.survey_id, unit.surveyId);
    assert.equal(res.user_id, unit.userId);
    assert.ok(res.questions.length);
    
    // Get ILT session
    res = await sdk.unit.getIltSessions({ilt_id: unit.iltId});
    assert.ok(res.length);
  });

  it('should run "siteInfo" operations', async () => {
    const {siteInfo} = testConf;

    // Get domain info
    let res = await sdk.siteInfo.get();
    assert.ok(res.total_users);
    assert.ok(res.total_courses);

    // Get rate limit info
    res = await sdk.siteInfo.getRateLimit();
    console.log(`Remaining requests: ${res.remaining}`);
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
    res = await sdk.siteInfo.getTimeline({
      event_type: 'user_login_user',
      user_id: siteInfo.userId
    });
    assert.ok(res.length);
    res.forEach((item) => {
      assert.equal(item.action, 'user_login_user');
      assert.equal(item.user_id, siteInfo.userId);
    });
  });

  it('should run "group" operations', async () => {
    const {group} = testConf;
    const {name, key} = group;

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
    res = await sdk.group.addUser({user_id: group.userId, group_key: key});
    assert.equal(res.user_id, group.userId);
    assert.equal(res.group_id, id);
    assert.equal(res.group_name, name);

    // Add a course to the group
    res = await sdk.group.addCourse({course_id: group.courseId, group_id: id});
    assert.equal(res.course_id, group.courseId);
    assert.equal(res.group_id, id);
    assert.equal(res.group_name, name);

    // Get specific group and verify user and course add
    res = await sdk.group.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 1);
    assert.equal(res.users[0].id, group.userId);
    assert.equal(res.courses.length, 1);
    assert.equal(res.courses[0].id, group.courseId);

    // Remove user from group
    res = await sdk.group.removeUser({user_id: group.userId, group_id: id});
    assert.equal(res.user_id, group.userId);
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

  it('should run "course" operations', async () => {
    const {course} = testConf;
    const {name, customFieldVal} = course;

    // Get custom course fields
    let res = await sdk.course.getCustomCourseFields();
    const customFieldKey = res.find(val => val.name === course.customFieldName).key;

    // Create a course
    const createOpts = {
      name,
      creator_id: course.creatorId
    };
    createOpts[customFieldKey] = customFieldVal;
    res = await sdk.course.create(createOpts);
    assert.ok(res.id);
    assert.equal(res.name, name);

    const id = res.id.toString();

    // Get all courses (should include newly created course)
    res = await sdk.course.all();
    res = res.find((val) => val.id === id);
    assert.equal(res.name, name);

    // Add a user to a course
    res = await sdk.course.addUser({user_id: course.userId, course_id: id, role: 'learner'});
    assert.equal(res[0].user_id, course.userId);
    assert.equal(res[0].course_id, id);
    assert.equal(res[0].role, 'learner');

    // Get specific course and verify user exists
    res = await sdk.course.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 2);
    assert.ok(res.users.find(user => user.id === course.creatorId));
    assert.ok(res.users.find(user => user.id === course.userId));

    // Get go to course link
    res = await sdk.course.goToCourse({user_id: course.userId, course_id: id});
    assert.ok(res.goto_url.includes(`course_id:${id}`));

    // Get user course status
    res = await sdk.course.getUserStatus({user_id: course.userId, course_id: id});
    assert.equal(res.completion_percentage, '0');
    assert.equal(res.role, 'learner');

    // Reset user course status
    res = await sdk.course.resetUserProgress({user_id: course.userId, course_id: id});
    assert.equal(res.message, 'Operation completed successfully');

    // Remove user
    res = await sdk.course.removeUser({user_id: course.userId, course_id: id});
    assert.equal(res.user_id, course.userId);
    assert.equal(res.course_id, id);
    assert.equal(res.course_name, name);

    // Verify user removal
    res = await sdk.course.retrieve(id);
    assert.equal(res.name, name);
    res.users.forEach(user => assert.ok(user.id !== course.userId));

    // Get course by custom field
    res = await sdk.course.getByCustomField({custom_field_value: customFieldVal});
    assert.equal(res.length, 1);
    assert.equal(res[0].id, id);

    // Get a buy course link
    res = await sdk.course.buyCourse({user_id: course.userId, course_id: id});
    assert.ok(res.redirect_url);

    // Delete the course
    res = await sdk.course.delete({course_id: id});
    assert.equal(res.message, 'Operation completed successfully');

    // Verify course deletion
    res = await sdk.course.all();
    res = res.find((val) => val.id === id);
    assert.ok(!res);
  });

  it('should run "category" operations', async () => {
    const {category} = testConf;
    const id = category.id;

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
    assert.equal(Object.keys(res).length, category.leafIds.length);
    category.leafIds.forEach(leafId => assert.equal(res[leafId].id, leafId));

    // Get buy category link
    res = await sdk.category.buyCategoryCourses({
      category_id: category.id,
      user_id: category.userId
    });
    assert.ok(res.redirect_url);
  });

  it('should run "branch" operations', async () => {
    const {branch} = testConf;
    const name = branch.name;

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
    res = await sdk.branch.addUser({user_id: branch.userId, branch_id: id});
    assert.equal(res.user_id, branch.userId);
    assert.equal(res.branch_id, id);
    assert.equal(res.branch_name, name);

    // Add a course to the new branch
    res = await sdk.branch.addCourse({course_id: branch.courseId, branch_id: id});
    assert.equal(res.course_id, branch.courseId);
    assert.equal(res.branch_id, id);
    assert.equal(res.branch_name, name);

    // Retrieve the newly created branch and verify new elements
    res = await sdk.branch.retrieve(id);
    assert.equal(res.name, name);
    assert.equal(res.users.length, 1);
    assert.equal(res.users[0].id, branch.userId);
    assert.equal(res.courses.length, 1);
    assert.equal(res.courses[0].id, branch.courseId);
    
    // Remove the user from the branch
    res = await sdk.branch.removeUser({user_id: branch.userId, branch_id: id});
    assert.equal(res.user_id, branch.userId);
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
