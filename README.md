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

1. Clone the repository:

```bash
git clone https://github.com/chetanxpro/VideoSanitizer.git
cd VideoSanitizer
```

2. Install dependencies:

```bash
npm install
```

### Configuration

Copy the .env.example file to .env and update it with your OpenAI API key.

```bash
cp .env.example .env
```

## Contributing

As an open-source project in a rapidly developing field, we are extremely open to contributions, whether it would be in the form of a new feature, improved infrastructure, or better documentation.

