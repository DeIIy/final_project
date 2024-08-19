![MasterHead](https://github.com/DeIIy/final_project/blob/main/README_Folder/24YYBB24018_Poster.png)

# Artificial Intelligence That Calculates the Estimated Budget of Flight Tickets, Hotels and Transportation Prices

## Project Description

This project is to provide a platform that predicts flight ticket, hotel and taxi prices with the support of artificial intelligence while users are making their travel plans. This platform recommends economical options that are suitable for users' preferences and needs and provides a more efficient experience by facilitating travel planning.

## Project Features

- Web scraping of flight ticket and hotel data from ‘https://www.makemytrip.com/’ using Selenium.
- Analysing airline ticket and hotel raw data with data mining techniques and transforming them into usable data
- Multiple linear regression modeling with the available data.
- Designing a dynamic and user-friendly website interface

## Screenshots

![Screenshots_1](https://github.com/DeIIy/final_project/blob/main/README_Folder/Empty_Interface.png)
![Screenshots_2](https://github.com/DeIIy/final_project/blob/main/README_Folder/Full_Interface.png)
![Screenshots_3](https://github.com/DeIIy/final_project/blob/main/README_Folder/Flight_Datas.png)
![Screenshots_4](https://github.com/DeIIy/final_project/blob/main/README_Folder/Hotel_Datas.png)
![Screenshots_5](https://github.com/DeIIy/final_project/blob/main/README_Folder/Selected_Data.png)

## Setup

### Requirements

- Node.js
- Python 3.x
- pip
- Git

### Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/DeIIy/final_project.git
    ```

2. **Frontend**
    ```bash
    npm start
    ```

3. **Backend**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    flask run
    ```

## Usage
- React Frontend: `http://localhost:3000`
- Flight Flask backend: `http://localhost:5000`
- Hotel Flask backend: `http://localhost:5001`

You can start using the application by visiting `http://localhost:3000` in your browser.

## Architecture and Project Structure

- `frontend/`: React Application.
- `backend/`: Flask Application.

## Contribute

If you would like to contribute, please open an "issue" first and state what you would like to improve. You can then submit a "pull request".


## Licence
This project is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license. Please use with appropriate attribution to the project owner: Yusuf Tunahan ETLİK(DeIIy).

## Communication
If you have questions or suggestions about this project, please email [ytetlik6875@gmail.com](mailto:ytetlik6875@gmail.com).

## Resources and Learnings
- [React Official Documentation](https://reactjs.org/docs/getting-started.html)
- [Flask Official Documentation](https://flask.palletsprojects.com/)
- [Structure used in web scraping](https://github.com/andrew-geeks/MakeMyTrip-scraper)

For more detailed information, review the project report: [Final Project Report](https://github.com/DeIIy/final_project/blob/main/README_Folder/Bitirme_Projesi_Raporu.pdf).
