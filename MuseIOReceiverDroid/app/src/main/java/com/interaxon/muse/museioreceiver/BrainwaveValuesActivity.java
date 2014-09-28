package com.interaxon.muse.museioreceiver;

import java.io.IOException;
import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.location.Location;
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

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.setContentView(R.layout.main);

		this.museReceiver = new MuseIOReceiver();
		this.museReceiver.registerMuseDataListener(this);
        mLocationClient = new LocationClient(this, this, this);
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

	@Override
	public void receiveMuseElementsAlpha(MuseConfig config, final float[] alpha) {
        this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				//Update Muse information
                ((TextView) BrainwaveValuesActivity.this
						.findViewById(R.id.alpha_ch2)).setText(String.format(
						"%.2f", alpha[1]));
				((TextView) BrainwaveValuesActivity.this
						.findViewById(R.id.alpha_ch3)).setText(String.format(
						"%.2f", alpha[2]));
                ((TextView) BrainwaveValuesActivity.this
                        .findViewById(R.id.alpha_difference)).setText(String.format(
                        "%.2f", (alpha[2]-alpha[1])));
                //Update Location information
                mCurrentLocation = mLocationClient.getLastLocation();
                ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.ValueLatitude)).setText(
                        String.format("%.6f", mCurrentLocation.getLatitude()));
                ((TextView) BrainwaveValuesActivity.this.findViewById(R.id.ValueLongitude)).setText(
                        String.format("%.6f", mCurrentLocation.getLongitude()));



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