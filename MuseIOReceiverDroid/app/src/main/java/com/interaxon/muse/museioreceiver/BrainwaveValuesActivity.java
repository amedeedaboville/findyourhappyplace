package com.interaxon.muse.museioreceiver;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesClient;
import com.google.android.gms.common.api.GoogleApiClient;

import com.google.android.gms.location.LocationClient;
import com.interaxon.muse.museioreceiver.MuseIOReceiver.MuseConfig;
import com.interaxon.muse.museioreceiver.MuseIOReceiver.MuseDataListener;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * This activity is meant to display the alpha, beta, theta and delta values
 * from only one headband.
 */
public class BrainwaveValuesActivity extends Activity implements
        MuseDataListener, GooglePlayServicesClient.ConnectionCallbacks,
        GooglePlayServicesClient.OnConnectionFailedListener{

    private MuseIOReceiver museReceiver;
    private LocationClient mLocationClient;
    private Location mCurrentLocation;
    private HttpClient mClient;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.setContentView(R.layout.main);

		this.museReceiver = new MuseIOReceiver();
		this.museReceiver.registerMuseDataListener(this);
        mLocationClient = new LocationClient(this, this, this);
        mClient = new DefaultHttpClient();

    }
    public void sendMessage(View v) {
        mCurrentLocation = mLocationClient.getLastLocation();
        ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.ValueLatitude)).setText(
        String.format("%.6f", mCurrentLocation.getLatitude()));
        ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.ValueLongitude)).setText(
                String.format("%.6f", mCurrentLocation.getLongitude()));

    }
    @Override
    protected void onStart() {
        super.onStart();
        // Connect the client.
        mLocationClient.connect();
    }
    @Override
    protected void onStop() {
        // Disconnecting the client invalidates it.
        mLocationClient.disconnect();
        super.onStop();
    }

	@Override
	public void onResume() {
		super.onResume();
		try {
			this.museReceiver.connect();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onPause() {
		super.onPause();
		this.museReceiver.disconnect();
	}

    private class UploadHappiness extends AsyncTask<UrlEncodedFormEntity, Integer, Integer> {
        @Override
        protected Integer doInBackground(UrlEncodedFormEntity... params) {
            HttpPost post = new HttpPost("http://yourhappyplace.net/insert");
            post.setHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                System.out.println(params[0].toString());
                post.setEntity(params[0]);
            try {
                HttpResponse response = mClient.execute(post);
                //Toast.makeText(getApplicationContext(), response.getStatusLine().toString(), Toast.LENGTH_SHORT).show();
                System.out.println(response.toString());
                response.getEntity().consumeContent();

            } catch (IOException e) {
                e.printStackTrace();
            }
            return 0;
        }
        protected void onPostExecute(Integer result) {
            //Toast.makeText(getApplicationContext(), "Uploaded " + result + " datapoint", Toast.LENGTH_SHORT).show();
        }
    }

        @Override
	public void receiveMuseElementsAlpha(MuseConfig config, final float[] alpha) {
        this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				//Update Muse information
                ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.alpha_ch2)).setText(String.format("%.2f", alpha[1]));
				((TextView) BrainwaveValuesActivity.this.findViewById(R.id.alpha_ch3)).setText(String.format("%.2f", alpha[2]));
                ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.alpha_difference)).setText(String.format("%.2f", (alpha[2]-alpha[1])));

                //Update Location information
                mCurrentLocation = mLocationClient.getLastLocation();
                final String latString =  String.format("%.6f", mCurrentLocation.getLatitude());
                final String lngString =  String.format("%.6f", mCurrentLocation.getLongitude());
                final String happy = String.format("%f", alpha[2] - alpha[1]);

                ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.ValueLatitude)).setText(latString);
                ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.ValueLongitude)).setText(lngString);

                List<NameValuePair> pairs = new ArrayList<NameValuePair>();
                pairs.add(new BasicNameValuePair("user_id", "1"));
                pairs.add(new BasicNameValuePair("lat", latString));
                pairs.add(new BasicNameValuePair("lng", lngString));
                pairs.add(new BasicNameValuePair("happy", happy));

                try {
                    new UploadHappiness().execute(new UrlEncodedFormEntity(pairs, "UTF-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

            }
		});
        
	}

	@Override
	public void receiveMuseElementsBeta(MuseConfig config, final float[] beta) {
        // Do nothing
	}

	@Override
	public void receiveMuseElementsTheta(MuseConfig config, final float[] theta) {
        // Do nothing
	}

	@Override
	public void receiveMuseElementsDelta(MuseConfig config, final float[] delta) {
        // Do nothing
	}

	@Override
	public void receiveMuseEeg(MuseConfig config, float[] eeg) {
		// Do nothing
	}

	@Override
	public void receiveMuseAccel(MuseConfig config, float[] accel) {
		// Do nothing		
	}

	@Override
	public void receiveMuseBattery(MuseConfig config, int[] battery) {
		// Do nothing
	}

    @Override
    public void onConnected(Bundle bundle) {
        Toast.makeText(this, "Connected", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDisconnected() {
        Toast.makeText(this, "Disconnected. Please re-connect.",
                Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {
/*
         * Google Play services can resolve some errors it detects.
         * If the error has a resolution, try sending an Intent to
         * start a Google Play services activity that can resolve
         * error.
         */
        if (connectionResult.hasResolution()) {
            try {
                // Start an Activity that tries to resolve the error
                connectionResult.startResolutionForResult(
                       this,
                       9000);// CONNECTION_FAILURE_RESOLUTION_REQUEST);

            } catch (IntentSender.SendIntentException e) {
                // Log the error
                e.printStackTrace();
            }
        } else {
            System.out.println("Connection Error");
        }
    }
};