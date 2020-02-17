window.addEventListener('load', () => {
    var countDown = undefined
    var startLength = 30;
    var minutes = 0;

    document.getElementById('start').onclick =
        (event) => {
            if (!!countDown) {
                clearInterval(countDown);
            }

            if (!focusArea) {
                return alert('Please add a focus!')
            }

            document.title = 'RUNNING';
            const endTime = new Date();
            const startTime = new Date();
            endTime.setMinutes(endTime.getMinutes() + minutes)

            countDown = setInterval(() => {
                const remainingTime = endTime - new Date();

                if (remainingTime < 0) {
                    clearInterval(countDown);
                    completeTask(startTime, endTime, focusArea)
                    const ding = new Audio('type-writer-ding.wav');
                    document.getElementById("timer").innerHTML = 'COMPLETE';
                    const stop = document.getElementById('stop');
                    stop.style.display = 'none';
                    event.target.style.display = '';
                    document.title = 'COMPLETE';
                    ding.play()
                    return;
                }

                document.getElementById('timer').innerHTML = formatTime(remainingTime);

                const stop = document.getElementById('stop');
                stop.style.display = '';
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
            return;
        }
})