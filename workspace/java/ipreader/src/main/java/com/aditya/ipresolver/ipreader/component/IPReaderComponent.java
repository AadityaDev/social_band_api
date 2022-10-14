package com.aditya.ipresolver.ipreader.component;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aditya.ipresolver.ipreader.pojo.IPAddress;

@Component
public class IPReaderComponent {
    
    @Autowired
    private IPAddress ipAddress;

    final private int MAX_SORTED_MAP_SIZE = 100;

    public Map<String, Integer> retrieveIPAddresses() {
        return ipAddress.getIPAddresses();
    }

    public Map<String, Integer> getTop100IPAddresses() {
        return ipAddress.getIPAddresses()!=null && ipAddress.getIPAddresses().size() > 0 ? ipAddress.getIPAddresses().entrySet()
        .stream()
        .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
        .limit(MAX_SORTED_MAP_SIZE)
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2)->
        e2, LinkedHashMap::new))
        : Collections.emptyMap();
    }

    public void saveIPAddress(String key) {
        ipAddress.saveIPAddress(key);
    }

    public void clear() {
        ipAddress.clear();
    }

}
