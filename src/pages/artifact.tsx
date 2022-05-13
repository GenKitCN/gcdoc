import {useCallback, useEffect, useState} from "react";
import ReliquaryDataProvider, {IReliquary, IReliquaryAffixItem, IReliquaryAffix, IReliquaryMain} from "../components/providers/Artifacts";
import {
    Autocomplete,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Input,
    TextField,
    Paper,
    ListSubheader, List, ListItemButton
} from "@mui/material";
//@ts-ignore
import _ from "lodash";
import * as React from "react";
import Layout from "@theme/Layout";

interface IOption {
    id: number;
    name: string;
}

interface IAffixOpt {
    id: number;
    name: string;
    index: number;
    value: number;
    displayValue: string | number;
}

export default function Artifacts() {
    const [uid, setUid] = useState(10001);
    const [selectedArtifact, setSelectedArtifact] = useState(0);
    const [selectedMainStat, setSelectedMainStat] = useState(0);
    const [selectedAffixes, setSelectedAffixes] = useState<number[]>([]);
    const [selectedAffixesAmount, setSelectedAffixesAmount] = useState<Record<number, number>>({});
    const [artifactEnhancements, setArtifactEnhancements] = useState<number>(0);

    const [artifactData, setArtifactData] = useState<IOption[]>([]);
    const [artifactMains, setArtifactMains] = useState<IOption[]>([]);
    const [artifactAffixes, setArtifactAffixes] = useState<{[key:string]:IAffixOpt[]}>({});
    const [generatedArtifact, setGeneratedArtifact] = useState("/giveart ");


    useEffect(() => {
        const dataArtifact: IOption[] = [];
        const dataMainAttrs: IOption[] = [];
        const dataAffixes: {[key:string]:IAffixOpt[]} = {}
        fetch("/FightProp.json")
            .then(resp => resp.json())
            .then(fightProp => {
                let ReliquaryAffixes = ReliquaryDataProvider.getReliquaryAffixes();
                ReliquaryDataProvider.getReliquaryMains().forEach(mainAttr => {
                    const id = mainAttr.id;
                    const name = fightProp[`cmdGen.Artifact.${mainAttr.propType}`];
                    dataMainAttrs.push({id: id, name: name});
                });
                Object.keys(ReliquaryAffixes).map((key, index) => {
                    ReliquaryAffixes[key].map((affix, rIndex) => {
                        const id = affix.id;
                        const name = fightProp[`cmdGen.Artifact.${affix.propType}`];
                        const index = affix.index;
                        const value = affix.propValue;
                        const displayValue = getPercent(affix);
                        if (Object.keys(dataAffixes).indexOf(name) == -1) {
                            dataAffixes[name] = [];
                        }
                        dataAffixes[name].push({id: id, name: name, index: index, value: value, displayValue: displayValue})
                    });
                });
                setArtifactMains(dataMainAttrs);
                setArtifactAffixes(dataAffixes);
                }
            );
        fetch("/SimpleTextMap.json")
            .then(resp => resp.json())
            .then(textMap => {
                ReliquaryDataProvider.getReliquary().forEach(reliquary => {
                    console.log(reliquary)
                    const id = reliquary.id;
                    const name = textMap[`cmdGen.TextMap.${reliquary.nameTextMapHash}`];
                    if (dataArtifact.filter((x) => x.name === name).length === 0) {
                        dataArtifact.push({id: id, name: name});
                    }
                });
                setArtifactData(dataArtifact);
            });
    },[]);
    useEffect(() => {
        handleGeneratedArtifact()
    }, [uid, selectedArtifact, selectedMainStat, selectedAffixes, selectedAffixesAmount, artifactEnhancements]);

    const handleArtifactChange = (event: any, value: any) => {
        if (value !== null) {
            setSelectedArtifact(value.id);
        }
    };

    const handleMainStatChange = (event: any, value: any) => {
        if (value !== null) {
            setSelectedMainStat(value.id);
        }
    };

    const handleAffixSelected = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, amount = false, affixId = 0) => {
        let newSelectedAffixes = [...selectedAffixes];
        let newSelectedAffixesAmount = {...selectedAffixesAmount};
        if (amount) {
            newSelectedAffixesAmount[affixId] = Number(event.target.value);
        } else {
            if (newSelectedAffixes.indexOf(Number(event.currentTarget.value)) === -1) {
                newSelectedAffixes.push(Number(event.currentTarget.value));
                newSelectedAffixesAmount[Number(event.currentTarget.value)] = 1;
            } else {
                newSelectedAffixes.splice(newSelectedAffixes.indexOf(Number(event.currentTarget.value)), 1);
                newSelectedAffixesAmount[Number(event.currentTarget.value)] = 0;
            }
        }
        setSelectedAffixes(newSelectedAffixes);
        setSelectedAffixesAmount(newSelectedAffixesAmount);
    };

    const getPercent = (affix: IReliquaryAffixItem) => {
        if (
            affix.propType.indexOf("PERCENT") !== -1 ||
            affix.propType.indexOf("CRITICAL") !== -1 ||
            affix.propType.indexOf("EFFICIENCY") !== -1 ||
            affix.propType.indexOf("EFFICIENCY") !== -1 ||
            affix.propType.indexOf("HURT") !== -1
        ) {
            return parseFloat(String(affix.propValue * 100)).toPrecision(3) + "%";
        }
        return parseInt(String(affix.propValue));
    };

    const handleGeneratedArtifact = () => {
        let selectedAffixesCombine: (string | number)[] = [];
        if (selectedAffixes.length > 0) {
            selectedAffixesCombine = selectedAffixes.map(x => {
                if (selectedAffixesAmount[x] > 1) {
                    return x + "," + selectedAffixesAmount[x];
                }
                return x;
            });
        }
        const generated = "/giveart @" + uid + " " + selectedArtifact + " " + selectedMainStat + " " + selectedAffixesCombine.join(" ") + " " + Number(artifactEnhancements + 1);
        setGeneratedArtifact(generated);
    };
    return (
        <Layout>
            <Container sx={{
                padding: {
                    xs: '5%',
                    sm: '10%'
                }
            }}>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 1000,
                        flexGrow: 1,
                        background: "rgb(253, 253, 253)"
                    }}
                >
                    <Grid container spacing={2} columns={{
                        xs: 1,
                        sm: 2
                    }}>
                        <Grid item container xs={12} sm={5} spacing={2}>
                            <Grid item container spacing={2}>
                                <Grid item xs={9}>
                                    <TextField fullWidth
                                               required
                                               id="outlined-required"
                                               label="UID"
                                               defaultValue="10001"
                                               onChange={(event) => setUid(parseInt(event.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField fullWidth
                                               required
                                               id="outlined-required"
                                               label="等级"
                                               defaultValue={artifactEnhancements}
                                               inputProps={{ inputMode: 'numeric',
                                                   step: 1,
                                                   min: 0,
                                                   max: 20,
                                                   type: 'number'}}
                                               onChange={(e)=>setArtifactEnhancements(Number(e.currentTarget.value))}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    aria-label="Artifact Name" id="ArtifactName"
                                    options={artifactData}
                                    sx={{
                                        width: "inherit"
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    onChange={handleArtifactChange}
                                    renderInput={(params) => <TextField {...params} label="圣遗物名" variant="outlined"/>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    aria-label="Artifact Main Stats" id="ArtifactMainStats"
                                    options={artifactMains}
                                    sx={{
                                        width: "inherit"
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    onChange={handleMainStatChange}
                                    renderInput={(params) => <TextField {...params} label="主属性"
                                                                        variant="outlined"/>}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} sm={7}>
                            <List
                                sx={{
                                    width: 'inherit',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    '& ul': { padding: 0 },
                                }}
                                subheader={<li />}
                            >
                                {Object.keys(artifactAffixes).map((key, index) => (
                                    <li key={index}>
                                        <ul>
                                            <ListSubheader>{key}</ListSubheader>
                                            {
                                                artifactAffixes[key].map((affix, rIndex) => (
                                                        <ListItemButton key={affix.index}>
                                                            <FormControlLabel
                                                                control={<Checkbox
                                                                    value={affix.id}
                                                                    id={"select-"+affix.id}
                                                                    onChange={(e)=>handleAffixSelected(e,false,0)}
                                                                />}
                                                                label={`${affix.name} - ${affix.displayValue}`} />
                                                            <Input
                                                                value={Object.keys(selectedAffixesAmount).indexOf(String(affix.id)) != -1? selectedAffixesAmount[affix.id]:1}
                                                                size="small"
                                                                onChange={(e)=>handleAffixSelected(e,true, affix.id)}
                                                                inputProps={{
                                                                    step: 1,
                                                                    min: 1,
                                                                    max: 100,
                                                                    type: 'number',
                                                                    'aria-labelledby': 'input-slider',
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    )
                                                )
                                            }
                                        </ul>
                                    </li>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="命令 (20级的等级为21)" variant="standard" value={generatedArtifact}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    );
}