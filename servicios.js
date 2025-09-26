<script>
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

   document.querySelectorAll('.div-show').forEach((el) => observer.observe(el));
</script>



