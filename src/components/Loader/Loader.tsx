import { ScaleLoader } from "react-spinners"

const Loader = () => {
  return (
    <div>
      <ScaleLoader
        height={35}
        width={4}
        radius={2}
        margin={2}
        color={"#0b5ed7"}
        barCount={7}
        cssOverride={{ display: "flex", justifyContent: "center" }}
      />
    </div>
  )
}

export default Loader