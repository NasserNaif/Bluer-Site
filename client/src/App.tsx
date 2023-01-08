import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";

function App() {
  let svg = createAvatar(style, {
    dataUri: true,
    backgroundColor: ["gray"],
    radius: 50,
  });

  console.log(svg);
  return (
    <div className="App">
      <img src={svg} style={{ width: "200px", borderRadius:"50%" }} />
    </div>
  );
}

export default App;
