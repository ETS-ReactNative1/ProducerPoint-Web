import styled from 'styled-components';

export const Area = styled.div`
    
    .title--box {
        display: flex;
        height: 50px;
        background-color: #ccc;
        padding: 0 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        justify-content: space-between;
        align-items: center;
        h3 {
            font-size: 18px;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        margin: auto;
        flex-direction: column;

        .group--form {
            flex: 1;
            display: flex;
            margin-bottom: 10px;
            justify-content: space-between;

            .name--form {
                width: 60%;
            }

            .nickname--form {
                width: 38.5%;
            }

            .contact--form {
                width: 20%;
            }

            .email--form {
                width: 35%;
            }

            .address--form {
                width: 10%;
            }

            .zipcode--form {
                width: 18%;
            }

            .citydist--form {
                width: 29%;
            }

            .reference--form {
                width: 59%;
            }

        }

        .select--form {
            flex: 1;
            display: flex;
            margin-bottom: 10px;
            justify-content: space-between;

            .multi--form {
                flex: 1;
            }

            .selectunic--form {
                width: 60%;
            }
        }
    }
`;