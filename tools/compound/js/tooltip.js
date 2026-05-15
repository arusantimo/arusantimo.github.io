(function (app) {
    function initCustomTooltip() {
        if (window.customTooltipInitialized) return;
        window.customTooltipInitialized = true;

        let tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'custom-tooltip';
            document.body.appendChild(tooltip);
        }

        const updateTooltipPosition = (event) => {
            const gap = 15;
            let x = event.clientX + gap;
            let y = event.clientY + gap;
            const tooltipWidth = tooltip.offsetWidth || 200;
            const tooltipHeight = tooltip.offsetHeight || 50;

            if (x + tooltipWidth > window.innerWidth) {
                x = event.clientX - tooltipWidth - gap;
            }
            if (y + tooltipHeight > window.innerHeight) {
                y = event.clientY - tooltipHeight - gap;
            }

            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        };

        document.addEventListener('mouseover', (event) => {
            const target = event.target.closest('[data-tooltip]');
            if (!target) return;
            tooltip.textContent = target.getAttribute('data-tooltip');
            tooltip.classList.add('visible');
            updateTooltipPosition(event);
        });

        document.addEventListener('mousemove', (event) => {
            if (tooltip.classList.contains('visible')) {
                updateTooltipPosition(event);
            }
        });

        document.addEventListener('mouseout', (event) => {
            if (event.target.closest('[data-tooltip]')) {
                tooltip.classList.remove('visible');
            }
        });
    }

    app.tooltip = { initCustomTooltip };
})(window.CompoundAsset = window.CompoundAsset || {});
