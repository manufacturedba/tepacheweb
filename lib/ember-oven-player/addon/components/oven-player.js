import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import OvenPlayer from 'ovenplayer';
import { Promise } from 'rsvp';

const EVENT_MAP = {
  ready: 'onReady',
  metaChanged: 'onMetaChanged',
  stateChanged: 'onStateChanged',
  resized: 'onResized',
  playbackRateChanged: 'onPlaybackRateChanged',
  seek: 'onSeek',
  seeked: 'onSeeked',
  time: 'onTime',
  bufferChanged: 'onBufferChanged',
  mute: 'onMute',
  volumeChanged: 'onVolumeChanged',
  playlistChanged: 'onPlaylistChanged',
  sourceChanged: 'onSourceChanged',
  qualityLevelChanged: 'onQualityLevelChanged',
  cueChanged: 'onCueChanged',
  timeDisplayModeChanged: 'onTimeDisplayModeChanged',
  adChanged: 'onAdChanged',
  adTime: 'onAdTime',
  adComplete: 'onAdComplete',
  fullscreenChanged: 'onFullscreenChanged',
  clicked: 'onClicked',
  allPlaylistEnded: 'onAllPlaylistEnded',
  hlsPrepared: 'onHlsPrepared',
  hlsDestroyed: 'onHlsDestroyed',
  dashPrepared: 'onDashPrepared',
  dashDestroyed: 'onDashDestroyed',
  destroy: 'onDestroy',
};

export default class OvenPlayerComponent extends Component {
  @tracked
  playerInstance;

  constructor() {
    super(...arguments);

    const debug = this.args.debug || false;
    OvenPlayer.debug(debug);
  }

  @action
  createPlayer(element) {
    return new Promise((resolve, reject) => {
      try {
        const instanceWrapper = element.querySelector(
          '.ovenplayer__instance-wrapper'
        );

        const onceEvents = this.args.once || {};

        this.playerInstance = OvenPlayer.create(instanceWrapper, {
          ...this.args.options,
        });

        Object.keys(onceEvents).map((eventName) => {
          this.playerInstance.once(eventName, onceEvents[eventName]);
        });

        Object.entries(EVENT_MAP).forEach(([eventName, componentArgName]) => {
          if (this.args[componentArgName]) {
            this.playerInstance.on(eventName, this.args[componentArgName]);
          }
        });

        this.playerInstance.once('ready', () => resolve());
      } catch (e) {
        reject(e);
      }
    });
  }

  @action
  remove() {
    this.playerInstance.remove();
  }
}
