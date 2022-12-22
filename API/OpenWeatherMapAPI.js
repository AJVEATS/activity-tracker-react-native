/**
 * @fileoverview This file is for weather api that gets the current weather 
 */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


const OpenWeatherMapAPI = ({ lat, lon }) => {

    let apiKey = "c615be41df83e8620d84a99ecba2db62";

    const [temperature, setTemperature] = useState('');
    const [locationName, setLocationName] = useState('');
    const [condition, setCondition] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');

    /**
     * @param {lat, lon} The places latitude and longtitude from the national trust api
     * 
     * The function fetches the data for the places by its location. It then sets the temperature
     * from the data returned by the open weather map api. It also sets an icon depending of the 
     * places returned condition.
     */
    function fetchWeather(lat, lon) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric`)
            .then((response) => response.json())
            .then((responseJSON) => {
                // console.log(responseJSON);
                setTemperature(responseJSON.main.temp);
                setLocationName(responseJSON.name);
                setCondition(responseJSON.weather[0].description);
                // setCondition(responseJSON.main)
                if (responseJSON.weather[0].main === "Fog") {
                    setWeatherIcon(<Ionicons name={"cloud"} size={24} />)
                } else if (responseJSON.weather[0].main === "Rain") {
                    setWeatherIcon(<Ionicons name={"rainy-outline"} size={24} />)
                } else if (responseJSON.weather[0].main === "Clear") {
                    setWeatherIcon(<Ionicons name={"sunny-outline"} size={24} />)
                } else if (responseJSON.weather[0].main === "Clouds") {
                    setWeatherIcon(<Ionicons name="cloudy-outline" size={24} />)
                } else if (responseJSON.weather[0].main === "Snow") {
                    setWeatherIcon(<Ionicons name="snow-outline" size={24} />)
                } else if (responseJSON.weather[0].main === "Drizzle") {
                    setWeatherIcon(<Ionicons name="water-outline" size={24} />)
                } else if (responseJSON.weather[0].main === "Thunderstorm") {
                    setWeatherIcon(<Ionicons name="thunderstorm-outline" size={24} />)
                } else {
                    setWeatherIcon(<Ionicons name="thermometer-outline" size={24} />)
                }
            });
    }

    useEffect(() => {
        async function getData() {
            try {
                fetchWeather(lat, lon);
            } catch (error) {
                console.warn(error);
            }
        }
        getData();
    }, []);

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.weatherInfo}>
                <View style={styles.weatherConditionContainer}>
                    <View style={styles.weatherIcon}>{weatherIcon}</View>
                    <Text style={styles.weatherCondition}>{condition}</Text>
                </View>
                <View style={styles.weatherTempContainer}>
                    <Text style={styles.weatherTemp}>{Math.round(temperature * 10) / 10}{"\u00B0"}C</Text>
                </View>
            </View>
            <Text style={styles.weatherLocation}>{locationName}</Text>
        </View>
    );
}

export default OpenWeatherMapAPI

const styles = StyleSheet.create({
    weatherContainer: {
        width: '100%',
        marginBottom: 10,
    },
    weatherInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    weatherConditionContainer: {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    weatherIcon: {
    },
    weatherCondition: {
    },
    weatherTempContainer: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
    weatherTemp: {
        width: 'auto',
        textAlign: 'center',
    },
    weatherLocation: {
        textAlign: 'center'
    },
})