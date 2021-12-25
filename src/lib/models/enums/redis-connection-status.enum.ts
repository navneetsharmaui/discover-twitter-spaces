export enum RedisConnectionStatus {
	READY = 'ready',
	RECONNECTING = 'reconnecting',
	END = 'end',
	WAIT = 'wait',
	CONNECTING = 'connecting',
	CONNECT = 'connect',
}
