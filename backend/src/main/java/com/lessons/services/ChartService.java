package com.lessons.services;

import com.lessons.models.GetChart2DataDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ChartService {
    public List<GetChart2DataDTO> getChart2DataDTOS() {
        List<GetChart2DataDTO> dataSeries = new ArrayList<>();

        GetChart2DataDTO series1 = new GetChart2DataDTO();
        series1.setName("Installation & Developers");
        series1.setData(Arrays.asList(
                43934, 48656, 65165, 81827, 112143, 142383,
                171533, 165174, 155157, 161454, 154610, 168960, 171558));

        GetChart2DataDTO series2 = new GetChart2DataDTO();
        series2.setName("Manufacturing");
        series2.setData(Arrays.asList(
                24916, 37941, 29742, 29851, 32490, 30282,
                38121, 36885, 33726, 34243, 31050, 33099, 33473
        ));

        GetChart2DataDTO series3 = new GetChart2DataDTO();
        series3.setName("Sales & Distribution");
        series3.setData(Arrays.asList(
                11744, 30000, 16005, 19771, 20185, 24377,
                32147, 30912, 29243, 29213, 25663, 28978, 30618
        ));

        GetChart2DataDTO series4 = new GetChart2DataDTO();
        series4.setName("Operations & Maintenance");
        series4.setData(Arrays.asList(
                null, null, null, null, null, null, null,
                null, 11164, 11218, 10077, 12530, 16585
        ));

        GetChart2DataDTO series5 = new GetChart2DataDTO();
        series5.setName("Other");
        series5.setData(Arrays.asList(
                21908, 5548, 8105, 11248, 8989, 11816, 18274,
                17300, 13053, 11906, 10073, 11471, 11648
        ));

        return Arrays.asList(series1, series2, series3, series4, series5);

    }
}
