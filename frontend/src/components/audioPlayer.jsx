const AudioPlayer = ({songs}) => {
console.log(songs)

  return (<>
    <h1>songs</h1>
    <div>
      {songs.map((song, index) => 
          <audio key={index} src={song.audio} controls></audio>
    
      )}
    </div>
    </>
  )
}

export default AudioPlayer
