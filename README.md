# VideoSanitizer

VideoSanitizer is a tool designed to sanitize videos by automatically censoring or muting specific content within defined intervals. It utilizes AI to create a transcript of the video, extracts timestamps of curse words, and uses FFmpeg to add beep sounds at those identified places.

## Features

- **Automatic Transcription**: Utilizes AI to generate a transcript of the input video.
- **Curse Word Detection**: Employs AI to extract timestamps of curse words from the transcript.
- **Dynamic Beeping**: Adds beep sounds to curse words at identified timestamps using FFmpeg.
- **Easy Integration**: Simple to use with a clear command-line interface.

## Getting Started

### Prerequisites

- [FFmpeg](https://ffmpeg.org/) installed on your system.
- An API key for the AI service used for automatic transcription and curse word detection.

### Installation

Clone the repository:

```bash
git clone https://github.com/chetanxpro/VideoSanitizer.git
cd VideoSanitizer
```
