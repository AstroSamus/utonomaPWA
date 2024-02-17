import { h, render } from "preact"
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./VideoReel.css"

const Row = ({ index, style }) => (
  <div className="videoCard" style={style} > {index}</div>
)

const Demo = () => {
  return(
    <div className = "videoReelContainer">
      <AutoSizer>
        {({ height, width }) => (
          <List
          className = "shortVideoReel"
          height = { height }
          itemCount = { 1000 }
          itemSize = { height }
          width = { width }
          >
            { Row }
          </List>
        )}
      </AutoSizer>
    </div>
  )
}

  
render(<Demo />, document.querySelector("#infinite-scroll-of-short-videos"));