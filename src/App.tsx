import { useState } from "react";
import BG from "./assets/bg.png";
import Loader from "./assets/loader.gif";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedPPT, setSelectedPPT] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (event: any) => {
      if (!event || !event?.target || !event.target?.files) return;

      event.preventDefault();

      if (event.target.files && event.target.files[0]) {
        const videoFile = event.target.files[0];
        setSelectedVideo(videoFile);
        window.alert("Video Uploaded Successfully");
      }
    };
    input.click();
  };

  const getPPT = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pptx";
    input.onchange = (event: any) => {
      if (!event || !event?.target || !event.target?.files) return;

      event.preventDefault();

      if (event.target.files && event.target.files[0]) {
        const pptFile = event.target.files[0];
        setSelectedPPT(pptFile);
        window.alert("Presentation Uploaded Successfully");
      }
    };
    input.click();
  };

  const fetchResult = async () => {
    if (!selectedPPT || !selectedVideo) {
      window.alert("Please upload Video and Presentation");
      return;
    }

    try {
      setLoader(true);
      const formdata = new FormData();

      formdata.append("pptx", selectedPPT);
      formdata.append("video", selectedVideo);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      };

      const data = await fetch(
        "https://e985-34-147-94-124.ngrok-free.app/upload",
        requestOptions
      );

      const jsonData = await data.json();
      console.log(jsonData);
      setLoader(false);
      window.alert(jsonData?.msg);
    } catch (e: any) {
      setLoader(false);
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div className="bg-[#141516] w-screen h-screen overflow-hidden">
      <nav className="max-w-screen-xl h-20 flex justify-start items-center mx-auto">
        <div className="text-white text-3xl font-bold">APE</div>
      </nav>
      <main className="max-w-screen-xl mx-auto flex flex-row justify-between items-center h-3/4">
        <div className="w-1/2 ">
          <div className="text-4xl font-bold text-white">
            Empowering Your Presentations with Expert Insights and Real-Time
            Feedback
          </div>
          <div className="mt-4 text-white text-lg font-normal">
            Welcome to APE(Automated presentation evaluator), the ultimate tool
            for honing your presentation skills. Whether you're a seasoned
            speaker or preparing for your first public speaking engagement, our
            platform provides personalized feedback to transform your
            presentation into a powerful and impactful experience.
          </div>
          <div className="text-white text-lg font-normal flex flex-row mt-16 justify-between">
            <div className="flex flex-row gap-8">
              <div
                onClick={getPPT}
                className="border-solid border-2 border-white px-5 py-3 rounded-xl cursor-pointer flex justify-center items-center"
              >
                Upload PPT
              </div>
              <div
                onClick={getVideo}
                className="border-solid border-2 border-white px-5 py-3 rounded-xl cursor-pointer flex justify-center items-center"
              >
                Upload Video
              </div>
            </div>
            <div
              onClick={fetchResult}
              className="bg-blue-600 px-5 py-3 rounded-xl cursor-pointer flex justify-center items-center"
            >
              Start Analysing
            </div>
          </div>
        </div>
        <img src={BG} width={600} height={600} alt="Presentation" />
      </main>
      {loader && (
        <div
          className="absolute left-0 right-0 bottom-0 top-0 w-screen h-screen flex justify-center items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <img src={Loader} className="w-20 h-20" alt="Presentation" />
        </div>
      )}
    </div>
  );
}
