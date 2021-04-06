// import React, { useState, useEffect } from 'react'
// import { Input, DatePicker , Select, TreeSelect, Radio, InputNumber, Form } from 'antd'
import {PlusCircleOutlined } from '@ant-design/icons';
// import moment from "moment/moment";

// const Option = Select.Option
// const { RangePicker } = DatePicker;
// const { TreeNode } = TreeSelect;
// const { TextArea } = Input;

function getOptions(Options) {
	return Object.entries(Options).map(([k, v]) => ({
		label: v,
		value: String(k),
	}))
}

function getLabelOptions(Options) {
	return Object.entries(Options).map(([k, v]) => ({
		label: v.label,
		value: String(k),
	}))
}

function getPublishChannelOptions(Options) {
	return Object.entries(Options).map(([k, v]) => ({
		label: v.name,
		value: String(v.id),
	}))
}

function getSupplierOptions(Options) {
    return Object.entries(Options).map(([k, v]) => ({
        label: v.supplierName,
        value: String(v.supplierCode),
    }))
}

function getZDSelectOption(Options) {
	if( Options && Options.length ) {
		return Options.map(item => ({
			label: item.name,
			value: item.code,
			...item
		}))
	}
}

function getSelectName(select, code) {
	const selected = select.filter(item => parseInt(item.code) === parseInt(code))
	if(selected && selected.length){
		return selected[0].name
	}else{
		return null
	}
}

// function getControl(name, config) {
// 	const newConfig = _wrapConfig(config)
// 	switch (name){
// 		case 'input':
// 			return _input(newConfig)
// 		case 'inputNumber':
// 			return _inputNumber(newConfig)
// 		case 'textarea':
// 			return _textarea(newConfig)
// 		case 'radio':
// 			return _radio(newConfig)
// 		case 'select':
// 			return _select(newConfig)
// 		case 'rangePicker':
// 			return _rangePicker(newConfig)
// 		case 'treeSelect':
// 			return _treeSelect(newConfig)
// 	}
// }

// function _treeSelect(config) {
// 	const { nodes, ...restProps } = config
// 	const defaultProps = {
// 		dropdownStyle: { maxHeight: 400, overflow: 'auto' },
// 		allowClear: true,
// 		dropdownClassName: 'dropdown-menu',
// 	}
// 	const newProps = Object.assign({}, defaultProps, restProps)
// 	return (
// 		<TreeSelect {...newProps}>
// 			{nodes}
// 		</TreeSelect>
// 	)
// }

// function _treeSelectNode(nodes, config) {
// 	return nodes && nodes.length ? nodes.map(node => {
// 		if (node.childList) {
// 			return (
// 				<TreeNode isLeaf={!node.hasChild}   title={node.name} key={node.path} value={node.path} dataRef={node}>
// 					{_treeSelectNode(node.childList, config)}
// 				</TreeNode>
// 			)
// 		} else {
// 			return (
// 				<TreeNode title={node.name} key={node.path} value={node.path} {...node} isLeaf={!node.hasChild}/>
// 			)
// 		}
// 	}): null
// }
//
// function disabledDate(current) {
// 	return current && current > moment().endOf('day');
// }
//
// function _rangePicker(config) {
// 	return <RangePicker disabledDate={disabledDate} {...config} style={{ width: '100%'}}/>
// }

//
// function _select(config) {
// 	const { style, options, hidden, ...restProps } = config
// 	const selectStyle = {
// 		width: '100%',
// 		...style,
// 	}
// 	return (
// 		<Select style={selectStyle} {...restProps}>
// 			{ hidden ? null : <Option value={null}>全部</Option>}
// 			{options && options.length ? options.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>) : null}
// 		</Select>
// 	)
// }
//
// function _radio(config) {
// 	const { options, ...restProps } = config
// 	return (
// 		<Radio.Group {...restProps}>
// 			{options && options.length ? options.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>) : null}
// 		</Radio.Group>
// 	)
// }
//
//
// function _textarea(config) {
// 	return <TextArea rows={4} {...config} />
// }
//
// function _inputNumber(config) {
// 	return <InputNumber  style={{width: '100%'}} {...config}/>
// }
//
//
// function _input(config) {
// 	return <Input {...config} />
// }
//
// function _wrapConfig(config) {
// 	if(config){
// 		const { disabled, placeholder, ...rest } = config
//
// 		// disabled时候 不显示占位符
// 		let newPlaceholder = placeholder
// 		if (disabled && placeholder) {
// 			newPlaceholder = ''
// 		}
//
// 		return {
// 			...rest,
// 			disabled,
// 			placeholder: newPlaceholder,
// 		}
// 	}else{
// 		return {}
// 	}
// }
//
// const limitNumber = value => {
// 	if (typeof value === 'string') {
// 		return !isNaN(Number(value)) ? value.replace(/^(0+)|[^\d]/g, '') : ''
// 	} else if (typeof value === 'number') {
// 		return !isNaN(value) ? String(value).replace(/^(0+)|[^\d]/g, '') : ''
// 	} else {
// 		return ''
// 	}
// }

export {
	getOptions, getZDSelectOption, getLabelOptions, getSelectName,getSupplierOptions,getPublishChannelOptions
}
