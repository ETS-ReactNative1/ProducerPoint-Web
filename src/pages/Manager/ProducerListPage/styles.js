import styled from 'styled-components';

export const Area = styled.div`
    .title--box {
        display: flex;
        height: 40px;
        background-color: #ccc;
        padding: 0 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin-bottom: 10px;
        justify-content: space-between;
        align-items: center;

        h3 {
            font-size: 22px;
            font-variant: small-caps;
        }

        .title--input {
            height: 25px;
            border-radius: 5px;
         }

         .title--button {
            height: 25px;
            border-radius: 5px;
            margin-left: 5px;
         }
    }
`;