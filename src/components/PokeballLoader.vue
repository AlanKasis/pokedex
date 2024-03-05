<template>
    <div class="loader-container">
        <img src="/loader.png" class="loader-animation" />
    </div>
</template>

<style scoped>
.loader-animation {
    width: 106px;
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.5s infinite;
}

@keyframes shake {
    0% {
        transform: translateX(0) rotate(0);
    }

    20% {
        transform: translateX(-10px) rotate(-20deg);
    }

    30% {
        transform: translateX(10px) rotate(20deg);
    }

    50% {
        transform: translateX(-10px) rotate(-10deg);
    }

    60% {
        transform: translateX(10px) rotate(10deg);
    }

    100% {
        transform: translateX(0) rotate(0);
    }
}
</style>

