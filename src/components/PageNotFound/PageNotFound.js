import "./PageNotFound.css";
import sadFaceEmoji from '../../sadFaceEmoji.png';
import cherryLogo from "../../cherries.jpg";

const PageNotFound = () =>
    <div className="pageNotFound">
        <table className="pageNotFound">
            <tr>
                <tbody>
                <tr>
                    <td rowSpan="2" >
                        <img id="sadFaceEmoji" src={sadFaceEmoji} alt="sad face emoji"  width="200px" height="200px" />
                    </td>
                    <td>
                        <h2 className="pageNotFound">
                            Sorry that page does not exit.
                        </h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3 className="pageNotFound">
                            Please navigate back to the home page and try again.
                        </h3>
                    </td>
                </tr>
                </tbody>
            </tr>
        </table>
    </div>;

export default PageNotFound