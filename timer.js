window.addEventListener('load', () => {
    var countDown = undefined
    var startLength = 30;
    var minutes = 30;

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
            endTime.setMinutes(endTime.getMinutes() + 0)

            countDown = setInterval(() => {
                const remainingTime = endTime - new Date();
                const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                let time = seconds + "s ";

                if (remainingTime < 0) {
                    clearInterval(countDown);
                    const ding = new Audio('type-writer-ding.wav');
                    changeCount(focusArea.id);
                    document.getElementById("timer").innerHTML = 'COMPLETE';
                    const stop = document.getElementById('stop');
                    stop.style.display = 'none';
                    event.target.style.display = '';
                    document.title = 'COMPLETE';
                    ding.play()
                    return;
                }

                if (hours > 0) {
                    time = hours + 'h ' + minutes + 'm ' + time;
                }
                else if (minutes > 0) {
                    time = minutes + "m " + time;
                }

                document.getElementById('timer').innerHTML = time;

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