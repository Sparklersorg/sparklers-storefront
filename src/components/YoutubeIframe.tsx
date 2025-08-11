export const YoutubeIframe = () => {
    const url = ''
    const videoUrl = `${url}?enablejsapi=1&autoplay=1`;

    return (
      <div
        className="flex items-center justify-center max-h-screen p-5 bg-[url('../../../../assets/bg-youtube.jpg')] bg-center bg-cover bg-no-repeat"
      >
        <iframe
          className="w-[80vw] h-[calc(80vw/1.77)] object-contain"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
