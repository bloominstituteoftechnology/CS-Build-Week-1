import React from "react";

function Slider() {
  //   let pixelSize;

  //   console.log(pixelSize);
  //   const [cellSizePx, setCellSizePx] = useState(pixelSize);

  //   var sheet = <style></style>,
  //     $rangeInput = $(".range input"),
  //     prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];

  //   document.body.appendChild(sheet);

  //   var getTrackStyle = function (el) {
  //     var curVal = el.value,
  //       val = (curVal - 1) * 25;
  //     style = "";

  //     // Set active label
  //     $(".range-labels li").removeClass("active selected");

  //     var curLabel = $(".range-labels").find("li:nth-child(" + curVal + ")");

  //     curLabel.addClass("active selected");
  //     curLabel.prevAll().addClass("selected");

  //     // Change background gradient
  //     for (var i = 0; i < prefs.length; i++) {
  //       style +=
  //         ".range {background: linear-gradient(to right, #37adbf 0%, #37adbf " +
  //         val +
  //         "%, #fff " +
  //         val +
  //         "%, #fff 100%)}";
  //       style +=
  //         ".range input::-" +
  //         prefs[i] +
  //         "{background: linear-gradient(to right, #37adbf 0%, #37adbf " +
  //         val +
  //         "%, #b2b2b2 " +
  //         val +
  //         "%, #b2b2b2 100%)}";
  //     }

  //     return style;
  //   };

  //   $rangeInput.on("input", function () {
  //     sheet.textContent = getTrackStyle(this);
  //   });

  //   // Change input value on label click
  //   $(".range-labels li").on("click", function () {
  //     var index = $(this).index();

  //     $rangeInput.val(index + 1).trigger("input");
  //   });

  return (
    <>
      {/* <div className="range">
        <input type="range" min="1" max="5" steps="2" value="1" />
      </div>

      <ul className="range-labels">
        <li className="active selected">Speed: 1</li>
        <li>Speed: 2</li>
        <li>Speed: 3</li>
        <li>Speed: 4</li>
        <li>Speed: 5</li>
      </ul> */}
    </>
  );
}

export default Slider;
