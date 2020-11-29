import rock from "../images/rock.png";
import paper from "../images/paper.png";
import scissors from "../images/scissors.png";
import ResultText from "./ResultText.js";

const Box = ({ title, color, callback, shape, active, result }) => {
  let shapeValue =
    shape === "rock" ? rock : shape === "paper" ? paper : scissors;

  if (!active) {
    callback = () => {};
  }

  return (
    <div className="col">
      <button className={`choice-card ${color}`} onClick={callback}>
        <h1>{title}</h1>
        <img src={shapeValue} alt="" />
      </button>
      <ResultText result={result} />
    </div>
  );
};

export default Box;
