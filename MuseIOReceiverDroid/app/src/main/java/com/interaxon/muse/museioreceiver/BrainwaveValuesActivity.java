package com.interaxon.muse.museioreceiver;

import java.io.IOException;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;



import com.interaxon.muse.museioreceiver.MuseIOReceiver.MuseConfig;
import com.interaxon.muse.museioreceiver.MuseIOReceiver.MuseDataListener;

/**
 * This activity is meant to display the alpha, beta, theta and delta values
 * from only one headband.
 */
public class BrainwaveValuesActivity extends Activity implements
		MuseDataListener{

	private MuseIOReceiver museReceiver;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.setContentView(R.layout.main);


		this.museReceiver = new MuseIOReceiver();
		this.museReceiver.registerMuseDataListener(this);



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
				((TextView) BrainwaveValuesActivity.this
						.findViewById(R.id.alpha_ch2)).setText(String.format(
						"%.2f", alpha[1]));
				((TextView) BrainwaveValuesActivity.this
						.findViewById(R.id.alpha_ch3)).setText(String.format(
						"%.2f", alpha[2]));
                /*((TextView) BrainwaveValuesActivity.this
                        .findViewById(R.id.alpha_difference)).setText(String.format(
                        "%.2f", alpha[2]-alpha[1]));*/
                ((TextView) BrainwaveValuesActivity.this
                        .findViewById(R.id.alpha_difference)).setText(String.format(
                        "%.2f", (alpha[2]-alpha[1])));
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

};