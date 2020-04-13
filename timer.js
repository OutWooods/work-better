import { completeTask, formatTime, extendTask } from './utilities.js';

window.addEventListener('load', () => {
    var timeLeft = 1800000;
    var milliseconds = 1800000;
    var isPaused = false;
    var isExtended = false;
    var endTime = new Date();
    var startTime = new Date();

    const finishCycle = (event) => {
        clearInterval(countDown);
        completeTask(startTime, endTime, milliseconds, focusArea)
        const ding = new Audio('type-writer-ding.wav');
        document.getElementById("timer").innerHTML = 'COMPLETE';
        const stop = document.getElementById('stop');
        stop.style.display = 'none';
        const pause = document.getElementById('pause');
        pause.style.display = 'none';
        const extend = document.getElementById('extend');
        extend.style.display = '';
        event.target.style.display = '';
        document.title = 'COMPLETE';
        ding.play()
    }

    document.getElementById('start').onclick =
        (event) => {
            if (!!countDown) {
                clearInterval(countDown);
            }

            document.title = 'RUNNING';

            if (isPaused) {
                endTime = dateFns.addMilliseconds(new Date(), timeLeft);
                isPaused = false;
            }
            else {
                endTime = new Date();
                startTime = new Date();
                timeLeft = milliseconds + '';
                endTime.setMinutes(endTime.getMinutes() + milliseconds / 60000)
            }

            countDown = setInterval(() => {
                const remainingTime = endTime - new Date();

                if (remainingTime < 0) {
                    finishCycle(event);
                    return;
                }

                document.getElementById('timer').innerHTML = formatTime(remainingTime);

                const stop = document.getElementById('stop');
                stop.style.display = '';
                const pause = document.getElementById('pause');
                pause.style.display = '';
                event.target.style.display = 'none';
            }, 500);
        }

    document.getElementById('stop').onclick =
        (event) => {
            if (!!countDown) {
                clearInterval(countDown);
            }

            document.getElementById("timer").innerHTML = "STOPPED";
            document.title = 'STOPPED';
            const start = document.getElementById('start');
            start.style.display = '';
            event.target.style.display = 'none';
            if (isExtended) {
                timeLeft = dateFns.differenceInMilliseconds(new Date(), endTime);
                extendTask(startTime, new Date(), milliseconds + timeLeft, focusArea)
            }
            else {
                timeLeft = dateFns.differenceInMilliseconds(endTime, new Date());
                completeTask(startTime, 'N/A', milliseconds - timeLeft, focusArea)
            }

            return;
        }

    document.getElementById('pause').onclick =
        (event) => {
            if (!!countDown) {
                clearInterval(countDown);
            }

            isPaused = true;
            timeLeft = dateFns.differenceInMilliseconds(endTime, new Date());

            document.getElementById("timer").innerHTML = "STOPPED";
            document.title = 'PAUSED';
            const start = document.getElementById('start');
            start.style.display = '';
            event.target.style.display = 'none';
            return;
        }

    document.getElementById('extend').onclick =
        (event) => {
            if (!!countDown) {
                clearInterval(countDown);
            }

            isExtended = true;

            document.title = 'EXTENDED';
            const stop = document.getElementById('stop');
            stop.style.display = '';
            const pause = document.getElementById('start');
            pause.style.display = 'none';
            event.target.style.display = 'none';
            countDown = setInterval(() => {
                const remainingTime = new Date() - endTime;

                document.getElementById('timer').innerHTML = formatTime(remainingTime);
            }, 500);
            return;
        }
})
