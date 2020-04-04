import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

const CourseList = ({ courses }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Id</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Author Name</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>{course.id}</td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.slug}</td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: Proptypes.array.isRequired
};

export default CourseList;
