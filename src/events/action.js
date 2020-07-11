/* eslint-disable no-undef */

import CustomEvent from '../polyfills/custom-event';

/**
 * Custom event triggered when an action is started
 *
 * @var CustomEvent
 */
const ActionStartedEvent = new CustomEvent('action.started');

/**
 * Custom event triggered when an action has failed
 *
 * @var CustomEvent
 */
const ActionFailedEvent = new CustomEvent('action.failed');

/**
 * Custom event triggered when an action has completed
 */
const ActionCompletedEvent = new CustomEvent('action.completed');

export { ActionStartedEvent, ActionCompletedEvent, ActionFailedEvent };
