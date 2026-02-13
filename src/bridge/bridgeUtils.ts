import {
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
} from 'react-native';

const NavigationBridge = NativeModules.NavigationBridge;
const DeviceEvents = new NativeEventEmitter(
  NativeModules.RNCoreEventEmitter || NativeModules.RCTDeviceEventEmitter
);

export interface BridgeEvent {
  type: string;
  payload?: any;
}

export const bridgeUtils = {
  /**
   * Navigate to a native screen from React Native
   * Usage: bridgeUtils.openNativeScreen('ProfileActivity', { userId: '123' })
   */
  openNativeScreen: (screenName: string, params?: Record<string, any>) => {
    if (!NavigationBridge) {
      console.warn('NavigationBridge module not available');
      return;
    }
    NavigationBridge.openNativeScreen(screenName, params || {});
  },

  /**
   * Update native header title from React Native
   * Usage: bridgeUtils.updateHeader('My Title', 'buttonLabel')
   */
  updateHeader: (title: string, rightButtonLabel?: string | null) => {
    if (!NavigationBridge) {
      console.warn('NavigationBridge module not available');
      return;
    }
    NavigationBridge.updateHeader(title, rightButtonLabel || null);
  },

  /**
   * Close React Native view and return to native
   */
  closeRNView: () => {
    if (!NavigationBridge) {
      console.warn('NavigationBridge module not available');
      return;
    }
    NavigationBridge.closeRNView();
  },

  /**
   * Listen for events emitted from native code
   * Usage: const unsubscribe = bridgeUtils.onNativeEvent('event_name', (data) => { ... })
   */
  onNativeEvent: (
    eventName: string,
    callback: (data: any) => void
  ): (() => void) => {
    const subscription = DeviceEvents.addListener(eventName, callback);
    return () => subscription.remove();
  },

  /**
   * Emit event to native code
   * Usage: bridgeUtils.emitToNative('event_name', { data: 'value' })
   */
  emitToNative: (eventName: string, data?: any) => {
    if (!NavigationBridge) {
      console.warn('NavigationBridge module not available');
      return;
    }
    NavigationBridge.emitToNative(eventName, data || {});
  },
};

export default bridgeUtils;
