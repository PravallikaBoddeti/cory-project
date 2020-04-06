import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export const createCourse = course => ({
  type: types.CREATE_COURSE,
  course
});

export const loadCoursesSuccess = courses => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses
});

export const updateCourseSuccess = course => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course
});

export const createCourseSuccess = course => ({
  type: types.CREATE_COURSE_SUCCESS,
  course
});

export const loadCourses = () => {
  return dispatch => {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(err => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
};

export const saveCourse = course => {
  return (dispatch, getState) => {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(err => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
};
