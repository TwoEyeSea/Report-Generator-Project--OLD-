import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchReports } from "../../actions";
import { Link } from "react-router-dom";

class ReportList extends React.Component {
  componentDidMount() {
    this.props.fetchReports();
    // retrieves all the required data for the reports into our state on mounting the component
  }

  // Helper function to render data from the db.js file into jsx elements for the reportList component
  // * NB * If the db.json file isn't structured properly the renderList() helper function will not render the list properly.
  // It is important to test that the CreateReport() commponent is posting the db.json elements properly. You may have to delete previous elements if they corrupt the db.json file.

  renderList() {
    return this.props.reports.map((report) => {
      return <div className="item" key={report._id}>
        <i className="large middle aligned icon camera" />

        <div className="content">
          <Link to={`/reports/${report._id}`}> {/*link will eventually lead to ReportShow component*/}
            {report.title}
            <div className="description">{report.body}</div>
          </Link>
        </div>
      </div>;
    });

  }
  // return this.props.reports.map((report) => {
  //   return (
  //     <React.Fragment key={report.id}>
  //       {/* React Fragments are used for returning JSX elements without adding nodes to the DOM
  //       This is important because the Semantic Ui LLibrary has strict div and className formatting in order for styles to apply successfully. */}
  //       {report.Skills.map((skill, i) => {
  //         return (
  //           <React.Fragment key={i}>
  //             {/* <h4>{skill.Area}</h4> */}
  //             {skill.SkillSet.map((skillset, e) => {
  //               return (
  //                 <div className="item">
  //                   <i className=" large middle aligned icon file" />
  //                   <React.Fragment key={e}>
  //                     <div className="content">
  //                       <Link to={`/reports/${report.id}`}>
  //                         <div className="header">
  //                           AMRfeqwfeq :<div className="description">{skillset.Name}</div>
  //                         </div>
  //                       </Link>
  //                     </div>
  //                   </React.Fragment>
  //                 </div>
  //               );
  //             })}
  //           </React.Fragment>
  //         );
  //       })}
  //     </React.Fragment>
  //   );
  // });
  // }
  //  {
  //   return this.props.reports.map((report) => {
  //     return (
  //       <div className="item" key={report.id}>
  //         <i className=" large middle aligned icon file" />
  //         <div className="content">
  //           <Link to={`/reports/${report.project}`}>
  //             {report.title}
  //             <div className="description">
  //               AMR {report.project}: {report.description}
  //             </div>
  //           </Link>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  // Helper function to render the "Create New Report" button
  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/reports/new" className="ui button primary">
            Create New Report
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Reports</h2>
        <div className="ui relaxed divided list">{this.renderList()}</div>
        {/* the renderList helper function renders the jsx items into the celled list div */}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reports: Object.values(state.reports),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchReports })(ReportList);

// FUNCTIONAL CODE WITH CORRECT SEMANTIC UI STYLES
// renderList() {
//   return this.props.reports.map((report) => {
//     return (
//       <React.Fragment key={report.id}>
//         {report.Skills.map((skill, i) => {
//           return (
//             <React.Fragment key={i}>
//               {/* <h4>{skill.Area}</h4> */}
//               {skill.SkillSet.map((skillset, e) => {
//                 return (
//                   <div className="item">
//                     <i className=" large middle aligned icon file" />
//                     <React.Fragment key={e}>
//                       <div className="content">
//                         <Link to={`/reports/${report.id}`}>
//                           <div className="header">
//                             AMRfeqwfeq :<div className="description">{skillset.Name}</div>
//                           </div>
//                         </Link>
//                       </div>
//                     </React.Fragment>
//                   </div>
//                 );
//               })}
//             </React.Fragment>
//           );
//         })}
//       </React.Fragment>
//     );
//   });
// }
