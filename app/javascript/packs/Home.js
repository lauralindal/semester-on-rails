import React from 'react';
import {seedUserData} from './user.js';
import Header from './Header';
import ModulePlan from './ModulePlan';
import PlanningSection from './PlanningSection';
import CourseSchedule from './CourseSchedule';
import Popup from './PopupAlert.js';
import HoodieRepository from './HoodieRepository.js';
import StammdatenRepository from './StammdatenRepository.js';
import users from './users.json';
import courseData from './courseData.json';
import '../semesterplaner/styles/normalize.css';
import '../semesterplaner/styles/skeleton.css';
import '../semesterplaner/styles/custom-style.css';

class Home extends React.Component {

  constructor(){
    super();
    this.repository = new HoodieRepository();
    this.stammdaten = new StammdatenRepository();
    this.state = {
      isLoggedIn: true,
      moduleplan: [],
      userModules: users.students[0].tracked_modules,
      popupDismissed: false,
      clicked: false,
      originalStatus: users.students[0].tracked_modules.map((module) => {
        return module.status;
      })
    };
  };

  componentDidMount() {
    var isLoggedIn = this.state.isLoggedIn;
    if(isLoggedIn){
      this.loadModules();
    }
  };

 // when we ask hoodie for all it has in store, we get an array of objects,
 // so we want to pick the newest document/object which will contain the
 // most current set of module information for our user

 // this is where shit is broken b/c of hoodie
  getCurrentUserData(){
    var self = this;
    return this.repository.getCurrentUserData().then(function(userDataSet){
      self.setState({userModules: userDataSet.userModules});
      return Promise.resolve();
    });
  };

  performLogin(email, password) {
    var self = this;
    this.repository.signIn(email, password)
    .then(() => {
      this.setState({isLoggedIn: true});
      this.getCurrentUserData();
    })
    //TODO use arrow functionm & avoid self/this
    .catch(function (error) {
      this.repository.deleteAccount();
      this.repository.signUp(email, password);
      seedUserData()
      .then(function (userModules) {
        console.log('your initial data has been saved in state');
        self.setState({
          userModules: userModules
        });
      });
      console.log('🐳', error);
    })
  };

  performLogout() {
    this.repository.signOut()
    .then(() => {
      this.setState({isLoggedIn: false});
    })
    .catch((error) => {
      this.repository.deleteAccount();
      console.log('🐞', error);
    })
  };

  loadModules() {
    this.stammdaten.getModulData().then((resultSet) => {
      var modules = resultSet.data.studiengang.moduls.edges;
      modules = modules.map(function(module) {
        return module.node;
      });
      this.setState({
        moduleplan: modules
      });

    });
  }

  getSemestersForUser() {
    const { userModules, moduleplan } = this.state;
    if( moduleplan.length == 0){
      return [];
    }
    var semesters = [1,2,3,4,5,6].map(function(semester) {
      var filteredModules = moduleplan.filter(function(module) {
        return module.recommended_semester === semester;
      });
      return filteredModules.map(function(module) {
        var userModule = userModules.find(function(userModule) {
          return userModule.reference_id === module.reference_id;
        });
        return {
          module: module,
          userModule: userModule
        }
      });
    });
    return semesters;
  };

  calculateTotalCredits() {
    const { userModules, moduleplan } = this.state;
    var totalCredits= 0;
    for (var i = 0; i < moduleplan.length; i++) {
      if (userModules[i].status === "completed"){
        totalCredits= totalCredits + moduleplan[i].cp;
      }
    }
    return totalCredits;
  };

  calculateCurrentCredits() {
    const { userModules, moduleplan } = this.state;
    var currentCredits= 0;
    for (var i = 0; i < moduleplan.length; i++) {
      if (userModules[i].selected){
        currentCredits= currentCredits + moduleplan[i].cp;
      }
    }
    return currentCredits;
  };

  calculateRemainingSemesters(){
    var totalCredits = this.calculateTotalCredits();
    var currentCredits = this.calculateCurrentCredits();
    var bachelorCredits = 180;
    return Math.ceil((bachelorCredits - (totalCredits + currentCredits))/30 + 1)
  };

  countSelectedCourses() {
    const { userModules } = this.state;
    var selectedCoursesCounter = 0;
    for (var i = 0; i < userModules.length; i++) {
      if (userModules[i].selected){
        selectedCoursesCounter ++;
      }
    }
    return selectedCoursesCounter;
  };

  retrieveSelectedCourseInfo() {
    const { userModules } = this.state;
    var courseInfo = courseData.timetable.lectures;
    var selectedModuleIds= [];
    var selectedCourseData= [];
    for (var i = 0; i < userModules.length; i++) {
      if (userModules[i].selected){
        selectedModuleIds.push(userModules[i].reference_id);
      }
    }
    for (var i = 0; i < selectedModuleIds.length; i++) {
      for (var j=0; j < courseInfo.length; j++){
        if (selectedModuleIds[i] === courseInfo[j].related_module_id) {
          selectedCourseData.push(courseInfo[j]);
        }
      }
    }
    return selectedCourseData;
  };

  retrieveSelectedModuleTitle(){
    const { userModules, moduleplan } = this.state;
    var selectedModuleIds = [];
    var selectedModuleTitles = [];
    for (var i = 0; i < userModules.length; i++) {
      if (userModules[i].selected){
        selectedModuleIds.push(userModules[i].reference_id);
      }
    }
    for (var i = 0; i < selectedModuleIds.length; i++) {
      for (var j=0; j < moduleplan.length; j++){
        if (selectedModuleIds[i] === moduleplan[j].id) {
          selectedModuleTitles.push(moduleplan[j].title);
        }
      }
    }
    return selectedModuleTitles;
  };

  retrieveSelectedModules(){
    const { userModules, moduleplan } = this.state;
    var selectedModuleIds = [];
    var selectedModuleTitles = [];
    for (var i = 0; i < userModules.length; i++) {
      if (userModules[i].selected){
        selectedModuleIds.push(userModules[i].reference_id);
      }
    }
    for (var i = 0; i < selectedModuleIds.length; i++) {
      for (var j=0; j < moduleplan.length; j++){
        if (selectedModuleIds[i] === moduleplan[j].id) {
          moduleplan[j].reference_id = selectedModuleIds[i];
          selectedModuleTitles.push(moduleplan[j]);
        }
      }
    }
    return selectedModuleTitles;
  };

  combineSelectedTitlesAndData(){
    var courseInformation = this.retrieveSelectedCourseInfo();
    const { moduleplan } = this.state;
    for (var i = 0; i < moduleplan.length; i++) {
      for (var j=0; j < courseInformation.length; j++)
      if (moduleplan[i].id === courseInformation[j].related_module_id){
        courseInformation[j].title = moduleplan[i].title;
      }
    }
    return courseInformation;
  };

  toggleModule(moduleId, e){
    e.preventDefault();
    const { userModules } = this.state;
    var data = null;
    for (var i = 0; i < userModules.length; i++) {
      if (userModules[i].reference_id === moduleId){
        if(userModules[i].status === "completed"){
          return;
        }
        userModules[i].selected = !userModules[i].selected;
        if (userModules[i].selected) {
          userModules[i].status = "selected";
        } else {
          userModules[i].status = this.state.originalStatus[i];
        }
      }
    }
    var urgentModules = userModules.filter((userModule)=> {
      return userModule.status === "urgent";
    })
    this.setState({
      userModules: userModules,
      clicked: urgentModules.length > 0
    });

    this.repository.updateUserModules(userModules)
    .then(() => {
      console.log('hoodie now has your new data');
    })
  };

  dismissPopup() {
    this.setState({popupDismissed: true});
  };

  selectUrgentModules() {
    var newUserModules = this.state.userModules.map((userModule)=> {
      if (userModule.status === "urgent") {
        userModule.status = "selected";
        userModule.selected = true;
      }
      return  userModule;
    });
    this.setState({
      userModules: newUserModules,
      popupDismissed: true
    });
  };

  returnUrgentModuleTitles() {
    const { userModules, moduleplan } = this.state;
    var urgentModules = userModules.filter((userModule)=> {
      return userModule.status === "urgent";
    });
    for(var i = 0; i < moduleplan.length; i++){
      for(var e = 0; e < urgentModules.length; e++){
        if(moduleplan[i].id === urgentModules[e].reference_id){
          var urgentModuleTitles = [];
          urgentModuleTitles.push(moduleplan[i].title);
        }
      }
    }
    return urgentModuleTitles;
  };

  renderUserData(isLoggedIn) {
    if(isLoggedIn) {
      var totalCreditPoints = this.calculateTotalCredits();
      var currentCreditPoints = this.calculateCurrentCredits();
      var remainingSemesters = this.calculateRemainingSemesters();
      var selectedCoursesCounter = this.countSelectedCourses();
      var semesters = this.getSemestersForUser();
      var selectedCourseInfo = this.retrieveSelectedCourseInfo();
      var selectedModuleTitles = this.retrieveSelectedModuleTitle();
      var combinedTitleAndData = this.combineSelectedTitlesAndData();
      var urgentModuleTitles = this.returnUrgentModuleTitles();
      return (
        <div>
          <ModulePlan semesters={semesters} toggleModule={this.toggleModule.bind(this)} />
          {this.state.clicked && !this.state.popupDismissed ?
            <Popup
              dismissPopup={this.dismissPopup.bind(this)}
              selectUrgentModules={this.selectUrgentModules.bind(this)}
              returnUrgentModuleTitles={urgentModuleTitles}
            /> : null}
          <PlanningSection
            totalCreditPoints={totalCreditPoints}
            selectedCourseInfo={selectedCourseInfo}
            selectedModuleTitles={selectedModuleTitles}
            currentCreditPoints={currentCreditPoints}
            remainingSemesters={remainingSemesters}
            selectedCoursesCounter={selectedCoursesCounter}
            toggleModule={this.toggleModule.bind(this)}
            retrieveSelectedModules={this.retrieveSelectedModules()}
          />
          <CourseSchedule
            selectedCourseInfo={selectedCourseInfo}
            combinedTitleAndData={combinedTitleAndData}
          />
        </div>
      );
    }
    return (<div><p>Hallo! Bitte logge dich ein, um dein kommendes Semester zu planen</p></div>);
  };

  render() {
    var isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
      <Header performLogin={this.performLogin.bind(this)} performLogout={this.performLogout.bind(this)}/>
      {this.renderUserData(isLoggedIn)}
      </div>
    );
  }
}

export default Home
