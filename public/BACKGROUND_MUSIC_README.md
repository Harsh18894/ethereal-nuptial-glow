# Background Music Setup

To add background music to your wedding website:

1. **Add your music file** to this directory (`/public/`) with the name `background-music.mp3`
2. **Supported formats**: MP3, WAV, OGG, M4A
3. **Recommended**: Use MP3 format for best browser compatibility
4. **File size**: Keep under 5MB for optimal loading performance

## Example:
- Place your music file as: `/public/background-music.mp3`
- The audio will automatically start playing when the first component loads
- Users can mute/unmute using the button in the bottom-left corner

## Customization:
You can change the music file path by editing the `src` property in the `useBackgroundMusic` hook call in `src/App.tsx`.

## Browser Autoplay Policy:
- Modern browsers may prevent autoplay until user interaction
- The audio will start playing after the first user interaction (click, tap, etc.)
- This is normal behavior and helps prevent unwanted audio
