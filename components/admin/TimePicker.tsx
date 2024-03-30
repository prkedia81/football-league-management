import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface TimePickerProps {
  value?: string;
  onChange: (...event: any[]) => void;
}
const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [hourValue, setHourValue] = useState("00");
  const [minuteValue, setMinuteValue] = useState("00");
  const [selectedTime, setSelectedTime] = useState(value || "12:00 PM");

  const handleHourChange = (selectedValue: string) => {
    setHourValue(selectedValue);
    onChange(hourValue + ":" + minuteValue);
    // handleTimeChange();
  };

  const handleMinuteChange = (selectedValue: string) => {
    setMinuteValue(selectedValue);
    onChange(hourValue + ":" + minuteValue);
  };

  const handleTimeChange = () => {
    value = hourValue + ":" + minuteValue;
    onChange(value);
  };
  return (
    <div className="flex w-full gap-2">
      <Select onValueChange={handleHourChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Hours" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Hours</SelectLabel>
            <SelectItem value="00">00</SelectItem>
            <SelectItem value="01">01</SelectItem>
            <SelectItem value="02">02</SelectItem>
            <SelectItem value="03">03</SelectItem>
            <SelectItem value="04">04</SelectItem>
            <SelectItem value="05">05</SelectItem>
            <SelectItem value="06">06</SelectItem>
            <SelectItem value="07">07</SelectItem>
            <SelectItem value="08">08</SelectItem>
            <SelectItem value="09">09</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="17">17</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="21">21</SelectItem>
            <SelectItem value="22">22</SelectItem>
            <SelectItem value="23">23</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={handleMinuteChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Minutes" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Minutes</SelectLabel>
            <SelectItem value="00">00</SelectItem>
            <SelectItem value="01">01</SelectItem>
            <SelectItem value="02">02</SelectItem>
            <SelectItem value="03">03</SelectItem>
            <SelectItem value="04">04</SelectItem>
            <SelectItem value="05">05</SelectItem>
            <SelectItem value="06">06</SelectItem>
            <SelectItem value="07">07</SelectItem>
            <SelectItem value="08">08</SelectItem>
            <SelectItem value="09">09</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="17">17</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="19">19</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="21">21</SelectItem>
            <SelectItem value="22">22</SelectItem>
            <SelectItem value="23">23</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="26">26</SelectItem>
            <SelectItem value="27">27</SelectItem>
            <SelectItem value="28">28</SelectItem>
            <SelectItem value="29">29</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="31">31</SelectItem>
            <SelectItem value="32">32</SelectItem>
            <SelectItem value="33">33</SelectItem>
            <SelectItem value="34">34</SelectItem>
            <SelectItem value="35">35</SelectItem>
            <SelectItem value="36">36</SelectItem>
            <SelectItem value="37">37</SelectItem>
            <SelectItem value="38">38</SelectItem>
            <SelectItem value="39">39</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="41">41</SelectItem>
            <SelectItem value="42">42</SelectItem>
            <SelectItem value="43">43</SelectItem>
            <SelectItem value="44">44</SelectItem>
            <SelectItem value="45">45</SelectItem>
            <SelectItem value="46">46</SelectItem>
            <SelectItem value="47">47</SelectItem>
            <SelectItem value="48">48</SelectItem>
            <SelectItem value="49">49</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="51">51</SelectItem>
            <SelectItem value="52">52</SelectItem>
            <SelectItem value="53">53</SelectItem>
            <SelectItem value="54">54</SelectItem>
            <SelectItem value="55">55</SelectItem>
            <SelectItem value="56">56</SelectItem>
            <SelectItem value="57">57</SelectItem>
            <SelectItem value="58">58</SelectItem>
            <SelectItem value="59">59</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default TimePicker;
