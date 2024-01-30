# VideoSanitizer

VideoSanitizer is an intelligent video sanitization tool that automatically censors or mutes explicit content in video

## Features

- **Automatic Transcription**: Utilizes [Nodejs Bindings](https://github.com/ChetanXpro/nodejs-whisper) for OpenAI whisper model to generate a transcript of the input video. 
- **Curse Word Detection**: Use AI to extract timestamps of curse words from the transcript.
- **Dynamic Beeping**: Adds beep sounds to curse words at identified timestamps using FFmpeg.
- **Easy Integration**: Simple to use with a clear command-line interface.

## Getting Started

### Prerequisites

- [FFmpeg](https://ffmpeg.org/) installed on your system.
- An API key of OpenAI, which is used for curse word detection.

### Installation

Clone the repository:

```bash
git clone https://github.com/chetanxpro/VideoSanitizer.git
cd VideoSanitizer
```
