import { QuartzComponentConstructor } from "./types"
import landingStyle from "./styles/landing.scss"

export const TOTAL_CARDS = 8
export const CARDS = {
  主页: (
    <a href={"/2.Yuekipedia/2.1 影像技术/fMRI Basic"}>
      <div class="card card-1">
        <p class="card-title">主页</p>
        <p class="card-subhead">Issue 001</p>
        <img src="/static/1-illo.png" class="card-illustration-1" />
      </div>
    </a>
  ),
  "getting-started": (
    <a href={"/getting-started"}>
      <div class="card card-2">
        <p class="card-title">神经科学</p>
        <p class="card-subhead">Issue 002</p>
        <img src="/static/2-illo.png" class="card-illustration-2" />
      </div>
    </a>
  ),
  "growing-people": (
    <a href={"/growing-people"}>
      <div class="card card-3">
        <p class="card-title">影像技术</p>
        <p class="card-subhead">Issue 003</p>
        <img src="/static/3-illo.png" class="card-illustration-3" />
      </div>
    </a>
  ),
  "superboosting-ideas": (
    <a href={"/superboosting-ideas"}>
      <div class="card card-4">
        <p class="card-title">个人生活</p>
        <p class="card-subhead">Issue 004</p>
        <img src="/static/4-illo.png" class="card-illustration-4" />
      </div>
    </a>
  ),
}

export default (() => {
  function LandingComponent() {
    return (
      <div>
        <div class="content-container">
          <p class="landing-header">欢迎来到越🌙球</p>
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
