import { forwardRef } from "react";

const Audio = forwardRef(function Audio(props, ref) {
    const { anthem } = props;
    const URL_ANTHEM = `https://www.nationalanthems.info`;
    return <audio
        ref={ref}
        controls
        src={`${URL_ANTHEM}/${anthem}.mp3`}
    ></audio>
})

export default Audio;