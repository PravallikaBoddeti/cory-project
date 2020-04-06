import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(err => {
        alert("Loading courses failed" + err);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(err => {
        alert("Loading authors failed" + err);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course Deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed." + error.message, { autoClose: false });
    }
  };

  // render() {
  //   return (
  //     <>
  //       {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
  //       <h2>Courses</h2>

  //       {this.props.courses.length === 0 ? (
  //         <Spinner />
  //       ) : (
  //         <>
  //           <button
  //             className="btn btn-primary add-course"
  //             style={{ marginBottom: 20 }}
  //             onClick={() => this.setState({ redirectToAddCoursePage: true })}
  //           >
  //             Add Course
  //           </button>
  //           <CourseList courses={this.props.courses} />
  //         </>
  //       )}
  //     </>
  //   );
  // }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              className="btn btn-primary add-course"
              style={{ marginBottom: 20 }}
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }

  // render() {
  //   return (
  //     <>
  //       {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
  //       <h2>Courses</h2>

  //       <button
  //         className="btn btn-primary add-course"
  //         style={{ marginBottom: 20 }}
  //         onClick={() => this.setState({ redirectToAddCoursePage: true })}
  //       >
  //         Add Course
  //       </button>
  //       {this.props.courses.length ? (
  //         <CourseList courses={this.props.courses} />
  //       ) : (
  //         <Spinner />
  //       )}
  //     </>
  //   );
  // }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
