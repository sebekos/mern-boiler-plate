import styled from "styled-components";

const DarkButton = styled.button`
    color: white;
    padding: 0.3rem 1rem;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in;
    outline: none;
    background-color: #343a40;
    &:hover {
        opacity: 0.8;
    }
    & > a {
        color: white;
    }
`;

export default DarkButton;
