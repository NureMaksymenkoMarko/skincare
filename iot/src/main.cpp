#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

#define DHTPIN 12
#define DHTTYPE DHT22

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""

const char *SERVER_URL = "http://consentient-sanjuanita-corymbosely.ngrok-free.dev/api/iot/environment";
const int USER_ID = 1;

DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void loop()
{
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature))
  {
    Serial.println("Failed to read DHT22");
    delay(5000);
    return;
  }

  Serial.print("Humidity: ");
  Serial.println(humidity);

  Serial.print("Temperature: ");
  Serial.println(temperature);

  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    String payload = "{";
    payload += "\"userId\":" + String(USER_ID) + ",";
    payload += "\"humidity\":" + String(humidity) + ",";
    payload += "\"temperature\":" + String(temperature);
    payload += "}";

    int responseCode = http.POST(payload);
    Serial.print("POST response: ");
    Serial.println(responseCode);

    String body = http.getString();
    Serial.print("Response body: ");
    Serial.println(body);

    http.end();
  }
  else
  {
    Serial.println("WiFi not connected");
  }

  delay(10000);
}
