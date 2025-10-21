.artist-card {
    width: 300px;
    height: 360px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: $border-radius;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
    color: $white;
    text-align: center;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-8px) scale(1.03);
        border-color: #ffb400;
        box-shadow: 0 0 15px rgba(255, 180, 0, 0.6);
    }

    img {
        width: 160px;
        height: 160px;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 1rem;
        flex-shrink: 0;
    }

    h3 {
        color: #ffb400;
        font-family: $font;
        font-size: 1.4rem;
        margin-bottom: $padding;
        flex-shrink: 0;
    }