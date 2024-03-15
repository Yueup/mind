import { QuartzComponentConstructor } from "./types"
import landingStyle from "./styles/landing.scss"

export const TOTAL_CARDS = 8
export const CARDS = {
  Homepage: (
    <a href={"Homepage"}>
      <div class="card card-1">
        <p class="card-title">Homepage</p>
        <p class="card-subhead">Space 001</p>
        <img src="static/1-illo.png" class="card-illustration-1" />
      </div>
    </a>
  ),
  "Yuekipedia": (
    <a href={"Yuekipedia"}>
      <div class="card card-2">
        <p class="card-title">Yuekipedia</p>
        <p class="card-subhead">Space 002</p>
        <img src="static/2-illo.png" class="card-illustration-2" />
      </div>
    </a>
  ),
  "Personal": (
    <a href={"Personal"}>
      <div class="card card-3">
        <p class="card-title">Personal Life</p>
        <p class="card-subhead">Space 003</p>
        <img src="static/3-illo.png" class="card-illustration-3" />
      </div>
    </a>
  ),
  "Toolbox": (
    <a href={"Toolbox"}>
      <div class="card card-4">
        <p class="card-title">Toolbox</p>
        <p class="card-subhead">Space 004</p>
        <img src="static/4-illo.png" class="card-illustration-4" />
      </div>
    </a>
  ),
  "Plan": (
    <a href={"Plan"}>
      <div class="card card-5">
        <p class="card-title">Plan</p>
        <p class="card-subhead">Space 005</p>
        <img src="static/5-illo.png" class="card-illustration-5" />
      </div>
    </a>
  ),
}


export default (() => {
  function LandingComponent() {
    return (
      <div>
        <div class="content-container">
          <p class="landing-header">Welcome to 越🌙球</p>
          <p class="page-subhead">
            关于我 •{" "}
            <a href="https://github.com/Yueup" target="_blank">
              Github
            </a>{" "}•{" "}
          </p>

          <div class="issue-container">
            {Object.values(CARDS)}
            {Array(TOTAL_CARDS - Object.keys(CARDS).length)
              .fill(0)
              .map(() => (
                <div class="card card-coming">
                  <p class="card-title">Coming Soon</p>
                  <p class="card-subhead">Issue XXX</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  LandingComponent.css = landingStyle
  return LandingComponent
}) satisfies QuartzComponentConstructor
