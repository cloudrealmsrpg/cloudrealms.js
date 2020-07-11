import { ActionStartedEvent, ActionFailedEvent, ActionCompletedEvent } from '../../events/action';

function action(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = (...args) => {
        target.dispatchEvent(ActionStartedEvent);
        const resolved = fn.call(target, ...args);
        if (!resolved) {
            target.dispatchEvent(ActionFailedEvent);
            return resolved;
        }
        target.dispatchEvent(ActionCompletedEvent);
        return resolved;
    };
}

export default action;
