window.addEventListener('load', () => {
    document.getElementById('hide-help').onclick = (event) => {
        document.querySelectorAll('.help').forEach((element) => {
            element.style.display = 'none';
        });
        document.querySelectorAll('.not-help').forEach((element) => {
            element.style.display = '';
        });
        event.target.style.display = 'none';
        document.getElementById('show-help').style.display = '';
    }

    document.getElementById('show-help').onclick = (event) => {
        document.querySelectorAll('.not-help').forEach((element) => {
            element.style.display = 'none';
        });
        document.querySelectorAll('.help').forEach((element) => {
            element.style.display = '';
        });
        event.target.style.display = 'none';
        document.getElementById('hide-help').style.display = '';
    }
})