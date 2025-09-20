import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
      <div className="wd-dashboard-course">
          <Link href="/Courses/4550" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpg" width={200} height={150} alt="web dev image"/>
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-web-dev">
              Full Stack software developer
              </p>
              <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3540" className="wd-dashboard-course-link">
            <Image
              src="/images/gameProgramming.jpg"
              width={200}
              height={150}
              alt="game programming class image"
            />
            <div>
              <h5> CS3540 Game Programming </h5>
              <p className="wd--game-programming">CS3540.31297.202530 Game Programming</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1113" className="wd-dashboard-course-link">
            <Image
              src="/images/biology.jpg"
              width={200}
              height={150}
              alt="general Biology class image"
            />
            <div>
              <h5> BIOL1113 General Biology </h5>
              <p className="wd--general-biology">BIOL1113.35112.202530 General Biology</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1280" className="wd-dashboard-course-link">
            <Image
              src="/images/frenchFilm.jpg"
              width={200}
              height={150}
              alt="french film image"
            />
            <div>
              <h5> FRNH1280 French Film </h5>
              <p className="wd--game-programming">FRNH1280.14999.202610 French Film and Culture </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3302" className="wd-dashboard-course-link">
            <Image
              src="/images/english.jpg"
              width={200}
              height={150}
              alt="english class image"
            />
            <div>
              <h5> ENGW3302 Advanced Writing </h5>
              <p className="wd--game-programming">ENGW3302.13730.202610 Advanced Writing</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3000" className="wd-dashboard-course-link">
            <Image
              src="/images/dataScience.jpg"
              width={200}
              height={150}
              alt="dataScience"
            />
            <div>
              <h5> CS3000 Data Science </h5>
              <p className="wd--game-programming">DS3000 Foundations of Data Science</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2800" className="wd-dashboard-course-link">
            <Image
              src="/images/logicComputation.jpg"
              width={200}
              height={150}
              alt="logic and Computation image"
            />
            <div>
              <h5> CS2800 Logic and Computation </h5>
              <p className="wd--game-programming">CS2800.MERGED.202530 Logic and Computation</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2310" className="wd-dashboard-course-link">
            <Image
              src="/images/Design.jpg"
              width={200}
              height={150}
              alt="digital design class image"
            />
            <div>
              <h5> EECE2310 Digital Design </h5>
              <p className="wd--game-programming">EECE2310.39993.202530 Intro to Digital Design</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
