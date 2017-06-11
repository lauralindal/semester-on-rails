import users from './users.json';

export function seedUserData(){
  var userModules = users.students[0].tracked_modules;
  return Promise.resolve()
  .then(() => {
    console.log('your initial data has been given to hoodie');
    return userModules;
  })
  .catch(function (error) {
    console.log('ohno', error);
  })
}
