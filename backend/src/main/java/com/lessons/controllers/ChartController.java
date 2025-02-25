package com.lessons.controllers;

import com.lessons.models.GetChart2DataDTO;
import com.lessons.services.ChartService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class ChartController {

    @Resource
    private ChartService chartService;

    @RequestMapping(value = "/api/charts/get-charts-data", method = RequestMethod.GET, produces = "application/json")
    @PreAuthorize("hasAnyRole('APP16_SUPERVISOR', 'APP16_SPECIALIST', 'APP16_ADMIN', 'APP16_REVIEWER')")
    public ResponseEntity<?> getChartData() {

       List<GetChart2DataDTO> listOfCharts = this.chartService.getChart2DataDTOS();

       return ResponseEntity.status(HttpStatus.OK).body(listOfCharts);
    }
}
